import React from "react";
import { useLocation, Link } from "react-router-dom";

const Results = () => {
  const location = useLocation();
  const { answers, questions } = location.state;

  console.log(answers);
  console.log(questions);

  const resultElements = questions.map((question, index) => {
    return (
      <div key={index}>
        <div className="singleQuestion">
          <h2>{question.question}</h2>
          <div className="choices">
            {question.choices.map((choice, aIndex) => {
              return (
                <div key={aIndex}>
                  <label
                    htmlFor={choice}
                    className={`radio-button ${
                      answers[index].answer === choice ||
                      question.correct_answer === choice
                        ? question.correct_answer === choice
                          ? "correct"
                          : "incorrect"
                        : "notPicked"
                    }`}
                  >
                    {choice}
                    <input
                      type="radio"
                      id={choice}
                      name={`question_${index}`}
                      className={`radio-button `}
                    />
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="resultSection">
      {resultElements}
      <Link to="/" className="nextQuizBtn">
        <button className="startBtn newQuiz">Start New Quiz</button>
      </Link>
    </div>
  );
};

export default Results;
