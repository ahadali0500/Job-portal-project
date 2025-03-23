"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import axios from "axios";
import { Button } from "primereact/button";
import { Skeleton } from "primereact/skeleton";
import { API_URL, SITE_URL } from "../../utils/config";
import { timestamp, useGetData } from "../../utils/helper.api";
import { useSession } from "next-auth/react";
import { Toast } from "primereact/toast";

export default function Page() {
  const { data: session, status } = useSession();
  const toast = useRef(null);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiloading, setapiLoading] = useState(true);
  const [loadingdisabled, setloadingdisabled] = useState(false);
  const [error, setError] = useState(null);

  var page = 1;

  console.log(total);
  const loadMoreData = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("user_id", session.user_id);
      const response = await axios.post(
        `${API_URL}/fetch_save_article.php`,
        formData
      );
      setData((data) => [...data, ...response.data.data]);
      setTotal(response.data.total);
      if (response.data.total < page * 6) {
        setloadingdisabled(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadMoreData();
  }, [session]);

  const api = async (url, index, type) => {
    try {
      setapiLoading(true);
      const formData = new FormData();
      formData.append("user_id", session.user_id);
      formData.append("article_id", data[index].id);
      const response = await axios.post(`${API_URL}/${url}`, formData);
      setmarkData(response.data);
    } catch (e) {
      setError(e);
    } finally {
      toast.current.show({
        severity: "success",
        detail: "Article removed from bookmark successfully",
        life: 6000,
      });
      setapiLoading(false);
    }
  };
  const toggleBookmark = async (index) => {
    setData((data) =>
      data.map((item, idx) => (idx === index ? { ...item, save: 0 } : item))
    );
    setData((currentData) => [
      ...currentData.slice(0, index),
      ...currentData.slice(index + 1),
    ]);
    const dt = await api("delete_user_article.php", index, "umark");
  };

  const loadmore = () => {
    page = page + 1;
    loadMoreData();
    if (total < page * 6) {
      setloadingdisabled(true);
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="section-full p-t40 site-bg-white">
        <div className="container">
          <div className="masonry-wrap row d-flex">
            {data.map((item, index) => (
              <div className="masonry-item col-lg-4 col-md-12" key={index}>
                <div className="blog-post twm-blog-post-1-outer">
                  <div className="wt-post-media">
                    <Link href={`/article/${item.slug}`}>
                      <img
                        alt="" style={{height:'200px'}}
                        src={`${SITE_URL}/images/articles/${item.image}`}
                      />
                    </Link>
                  </div>
                  <div className="wt-post-info">
                    <div className="wt-post-meta ">
                      {session && (
                        <>
                          <div style={{ float: "right" }}>
                            <i
                              onClick={() => toggleBookmark(index)}
                              style={{ fontSize: "25px", cursor: "pointer" }}
                              className="pi pi-bookmark-fill"
                            ></i>
                          </div>
                        </>
                      )}
                      <ul>
                        <li className="post-date">
                          {timestamp(item.created_at)}
                        </li>
                      </ul>
                    </div>
                    <div className="wt-post-title ">
                      <h4 className="post-title">
                        <Link href={`/article/${item.slug}`}>{item.title}</Link>
                      </h4>
                    </div>
                    <div className="wt-post-readmore ">
                      <Link
                        className="site-button-link site-text-primary"
                        href={`/article/${item.slug}`}
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {loading || !session ? (
        <>
          <div className="container mt-7">
            <div className="twm-job-categories-section-2 m-b30">
              <div className="job-categories-style1 m-b30">
                <div className="row">
                  {[...Array(6)].map((_, index) => (
                    <div
                      key={index}
                      style={{ marginBottom: "10px" }}
                      className="col-lg-4 col-md-6"
                    >
                      <Skeleton height="25rem" borderRadius="16px"></Skeleton>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <center>
          {!loadingdisabled ? (
            <Button
              className="site-button mb-6"
              label="Load More"
              onClick={loadmore}
            />
          ) : (
            <>
              <h4>No More data to load </h4>
              <br></br>
            </>
          )}
        </center>
      )}
    </>
  );
}
