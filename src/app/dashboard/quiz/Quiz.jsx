'use client';
import React, { useEffect, useState } from 'react';
import { Knob } from 'primereact/knob';
import Score from './Score';
import axios from 'axios';
import { API_URL } from '@/app/utils/config';
import { useSession } from "next-auth/react";
import { format } from 'date-fns';

export default function Quiz({ data, setdata, type, quizTitle }) {
    console.log(data);
    const [count, setCount] = useState(0);
    const [Scores, setScore] = useState(0);
    const [Result, setResult] = useState(false);
    const [viewans, setviewans] = useState({ status: false, index: null, val: null });
    const [options, setOptions] = useState([]);
    const { data: session, status } = useSession();

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    async function storedata() {
        try {
            console.log(Scores);
            const nm = Math.round(100 / data.length);
            const correct_answers = Math.round(Scores / nm);
            const now = new Date();
            const timestamp = format(now, 'yyyy-MM-dd HH:mm:ss');
            const formData = new FormData();
            formData.append('user_id', session.user_id);
            formData.append('total_questions', data.length);
            formData.append('correct_answers', correct_answers);
            formData.append('score', Scores);
            formData.append('quiz_detail', JSON.stringify(data));
            formData.append('quiz_title', quizTitle);
            formData.append('created_at', timestamp);
            const response = await axios.post(`${API_URL}/save_quiz.php`, formData);
            return response.data;
        } catch (error) {
            return error;
        }
    }

    useEffect(() => {
        if (data && data.length > 0) {
            const currentOptions = [
                data[count].correct_answer,
                ...data[count].incorrect_answers
            ];
            const shuffledOptions = shuffleArray(currentOptions);
            setOptions(shuffledOptions);
        }
    }, [count]);

    const [value, setValue] = useState(0);

    const optclick = async (option, index) => {
        const num = Math.round(100 / data.length);
        setValue(pre => Math.min(100, Math.round(pre + num))); // Round value to the nearest whole number and ensure it does not exceed 100
        setdata(pre => {
            const newData = [...pre];
            newData[count].selected_answer = option;
            return newData;
        });
        setviewans({
            status: true,
            index,
            val: option
        });
        if (option == data[count].correct_answer) {
            setScore(pre => {
                const newScore = Math.min(100, Math.round(pre + num)); // Round score to the nearest whole number and ensure it does not exceed 100
                return newScore;
            });
        }
        if (data.length == count + 1) {
            setTimeout(() => {
                setResult(true);
            }, 2000);
        } else {
            setTimeout(() => {
                setviewans({
                    status: false,
                    index: null,
                    val: null
                });
                setCount(pre => pre + 1);
            }, 2000);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (data.length === count + 1) {
                await storedata();
            }
        };

        fetchData();
    }, [Result]);

    return (
        <>
            {!Result &&
                <>
                    <br /><br />
                    <center>
                        <Knob value={value} size={150} />
                        <br />
                        <div className="box m-b30 box-res" >
                        {count+1} - {data.length}
                            <div>
                                <h3>Q {count + 1}: {data[count].question}</h3>
                            </div>
                            <br />
                            <center>
                                {options.map((option, index) => (
                                    <div key={index} className="twm-content">
                                        <div onClick={() => optclick(option, index)} className={`mcqbox ${viewans.status && option == data[count].correct_answer ? 'bg-success text-white' : ''}  ${viewans.status && viewans.val != data[count].correct_answer && viewans.index == index ? 'bg-danger text-white' : ''}  `}>
                                            {option}
                                        </div>
                                    </div>
                                ))}
                            </center>
                        </div>
                    </center>
                </>
            }
            {Result &&
                <Score score={Scores} total_questions={data.length}></Score>
            }
        </>
    );
}
