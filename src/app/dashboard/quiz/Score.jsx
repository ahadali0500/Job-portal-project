'use client'
import React from 'react';

export default function Score({ score, total_questions }) {
  const nm= 100/total_questions;
  const correct_answers=score/nm;

  const scorePercentage = Math.round((correct_answers / total_questions) * 100);

  let scoreImage = "/image/score/default.svg"; // Default image
  let message = "Good effort!"; // Default message
  if (score >= 90) {
    scoreImage = "/image/score/90.svg";
    message = "Outstanding";
  } else if (score >= 80) {
    scoreImage = "/image/score/80.svg";
    message = "Excellent";
  } else if (score >= 70) {
    scoreImage = "/image/score/70.svg";
    message = "Very Good";
  } else if (score >= 60) {
    scoreImage = "/image/score/60.svg";
    message = "Good Effort";
  } else if (score >= 50) {
    scoreImage = "/image/score/50.svg";
    message = "Good Try";
  } else {
    scoreImage = "/image/score/lessthen50.svg"; // This could be a specific image for scores below 50
    message = "Need Improvement";
  }

  return (
    <>
      <div>
        <center>
          <img style={{ width: '250px' }} src={scoreImage} alt="Score Illustration" />
          <h2>{message}</h2>
          <h2 className='text-success'>{scorePercentage}% Score</h2>
          <h5>Quiz Completed successfully.<br />
            You attempted {total_questions} question{total_questions !== 1 ? 's' : ''} and {correct_answers} {correct_answers !== 1 ? 'answers are' : 'answer is'} correct.</h5>
          <br />
          <div>
            {/* <i style={{ fontSize: '25px', padding: '10px' }} className='pi pi-share-alt'></i>
            <i style={{ fontSize: '25px', padding: '10px' }} className='pi pi-copy'></i>
            <i style={{ fontSize: '25px', padding: '10px' }} className='pi pi-home'></i> */}
          </div>
          <br />
        </center>
      </div>
    </>
  );
}
