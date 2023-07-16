import { React, useState, useEffect } from "react";
import { decode } from "html-entities";
import { Link } from "react-router-dom";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);

  async function getQuizQuestions() {
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&type=multiple"
      );
      if (!response.ok) {
        throw new Error("Error: " + response.status);
      }
      const data = await response.json();
      const decodedQuestions = data.results.map((question) => {
        const incorrectAnswers = [...question["incorrect_answers"]];
        const correctAnswer = question["correct_answer"];

        const randomIndex = Math.floor(
          Math.random() * (incorrectAnswers.length + 1)
        );
        incorrectAnswers.splice(randomIndex, 0, correctAnswer);

        return {
          ...question,
          question: decode(question.question),
          choices: incorrectAnswers,
        };
      });
      console.log(data.results);
      setQuestions(decodedQuestions);
      console.log(decodedQuestions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getQuizQuestions();
  }, []);

  const questionsElements = questions.map((question, index) => {
    return (
      <div className="questionsSection">
        <div key={index} className="singleQuestion">
          <h2>{question.question}</h2>
          <div className="choices">
            {question.choices.map((choice) => {
              return (
                <>
                  <input
                    type="radio"
                    id={choice}
                    value={choice}
                    className="radio-button"
                  />
                  <label htmlFor={choice}>{choice}</label>
                </>
              );
            })}
          </div>
        </div>
      </div>
    );
  });

  return <div>{questionsElements}</div>;
};

export default Quiz;
