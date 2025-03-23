'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '@/app/utils/config';
import { useSession } from "next-auth/react";
import { format } from 'date-fns';
import { Button } from 'primereact/button';

export default function Quiz({ data, score, total_questions,correct_answers }) {
    const [count, setCount] = useState(0);
    const [Scores, setScore] = useState(0);
    const [exp, setexp] = useState(false);
    const [options, setOptions] = useState([]);
    const { data: session, status } = useSession();

    console.log(data, "ok");
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
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
    }, [data, count]);

    const handlePrev = () => {
        let newCount = count - 1;
        if (newCount < 1) {
            newCount = data.length - 1;
        }
        setCount(newCount);
        setexp(false)
    }
    const handleNext = () => {
        let newCount = count + 1;
        if (newCount > data.length - 1) {
            newCount = 0;
        }
        setCount(newCount);
        setexp(false)
    }

    const explanation = () => {
        setexp(!exp)
    }


    return (

        <>
            <h5>Score: {score}%</h5>
            <h5>Total Question: {total_questions}</h5>
            <h5>Correct Answer: {correct_answers}</h5>
            <h5  style={{cursor:'pointer'}} onClick={explanation} >Explanation <i className='pi pi-question-circle' ></i></h5>
            {exp ? (<><p>{data[count].explanation}</p></>) : (<></>)}
            <br></br>
            <center>
                <div>
                    <div>
                        <h3>Q {count + 1}: {data[count].question}</h3>
                    </div>
                    <br />
                    <center>
                        {options.map((option, index) => (
                            <div key={index} className="twm-content">
                                <div style={{ width: '50%' }} className={`mcqbox ${option == data[count].correct_answer ? 'bg-success text-white' : ''}  ${data[count].selected_answer == option && option != data[count].correct_answer ? 'bg-danger text-white' : ''}  `}>
                                    {option}
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-content-between mt-3">
                            <Button
                                className="site-button"
                                label="Back"
                                onClick={handlePrev}
                            />
                            <Button
                                className="site-button"
                                label="Next"
                                onClick={handleNext}
                            />
                        </div>
                    </center>
                </div>
            </center>
        </>
    );
}
