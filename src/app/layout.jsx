'use client'
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import HolyLoader from "holy-loader";
import './components/primereact.css';
import { SessionProvider } from "next-auth/react";
import dotenv from "dotenv"
import { useEffect, useState } from "react";

dotenv.config({
  path: './.env'
})

export default function RootLayout({ children, session }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    if (document.readyState === 'complete') {
      setLoading(false);
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);
  
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="icon" href="/image/logo/logo2.png" type="image/x-icon" />
        <link rel="shortcut icon" type="image/x-icon" href="/image/logo/logo2.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" type="text/css" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="/css/font-awesome.min.css" />
        <link rel="stylesheet" type="text/css" href="/css/feather.css" />
        {/* <link rel="stylesheet" type="text/css" href="/css/owl.carousel.min.css" /> */}
        {/* <link rel="stylesheet" type="text/css" href="/css/magnific-popup.min.css" /> */}
        {/* <link rel="stylesheet" type="text/css" href="/css/lc_lightbox.css" /> */}
        {/* <link rel="stylesheet" type="text/css" href="/css/bootstrap-select.min.css" /> */}
        {/* <link rel="stylesheet" type="text/css" href="/css/dataTables.bootstrap5.min.css" /> */}
        {/* <link rel="stylesheet" type="text/css" href="/css/select.bootstrap5.min.css" /> */}
        {/* <link rel="stylesheet" type="text/css" href="/css/dropzone.css" /> */}
        <link rel="stylesheet" type="text/css" href="/css/scrollbar.css" />
        {/* <link rel="stylesheet" type="text/css" href="/css/datepicker.css" /> */}
        <link rel="stylesheet" type="text/css" href="/css/flaticon.css" />
        {/* <link rel="stylesheet" type="text/css" href="/css/swiper-bundle.min.css" /> */}
        <link rel="stylesheet" type="text/css" href="/css/style.css" />
        {/* <link rel="stylesheet" className="skin" type="text/css" href="/css/skins-type/skin-6.css" /> */}
        {/* <link rel="stylesheet" type="text/css" href="/css/switcher.css" /> */}

        <script src="/js/jquery-3.6.0.min.js"></script>
        <script src="/js/popper.min.js"></script>
        <script src="/js/bootstrap.min.js"></script>
        <script src="/js/magnific-popup.min.js"></script>
        <script src="/js/waypoints.min.js"></script>
        <script src="/js/counterup.min.js"></script>
        <script src="/js/waypoints-sticky.min.js"></script>
        {/* <script  src="/js/isotope.pkgd.min.js"></script> */}
        {/* <script  src="/js/imagesloaded.pkgd.min.js"></script> */}
        {/* <script  src="/js/owl.carousel.min.js"></script> */}
        {/* <script  src="/js/theia-sticky-sidebar.js"></script> */}
        {/* <script  src="/js/lc_lightbox.lite.js" ></script> */}
        {/* <script  src="/js/bootstrap-select.min.js"></script> */}
        {/* <script  src="/js/dropzone.js"></script> */}
        {/* <script  src="/js/jquery.scrollbar.js"></script> */}
        {/* <script  src="/js/bootstrap-datepicker.js"></script> */}
        {/* <script  src="/js/jquery.dataTables.min.js"></script> */}
        {/* <script  src="/js/dataTables.bootstrap5.min.js"></script> */}
        {/* <script  src="/js/chart.js"></script> */}
        {/* <script  src="/js/bootstrap-slider.min.js"></script> */}
        {/* <script  src="/js/swiper-bundle.min.js"></script> */}
        {/* <script  src="/js/custom.js"></script> */}
        {/* <script  src="/js/switcher.js"></script> */}
      </head>
      <body>
        <SessionProvider session={session}>
          {loading ? (
            <div className="loading-area">
              <div className="loading-box" />
              <div className="loading-pic">
                <div className="wrapper">
                  <div className="cssload-loader" />
                </div>
              </div>
            </div>
          ) : (
            <PrimeReactProvider>
              <HolyLoader
                color="#003366"
                height="5px"
                speed={250}
                easing="linear"
              />
              <div className="page-wraper">
                <Navbar />
                {children}
                <Footer />
              </div>
            </PrimeReactProvider>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
