import React, { useState, useEffect } from "react";
import { decode } from "html-entities";
import { Link, useNavigate } from "react-router-dom";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [hasUnansweredQuestions, setHasUnansweredQuestions] = useState(false);
  const navigate = useNavigate();
  console.log(navigate);

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
        const incorrectAnswers = [...question.incorrect_answers];
        const correctAnswer = question.correct_answer;

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
      setQuestions(decodedQuestions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function storeAnswers(question, value) {
    setAnswers((prev) => {
      const existingAnswerIndex = prev.findIndex(
        (answer) => answer.question === question
      );

      if (existingAnswerIndex !== -1) {
        // Update the existing answer
        const updatedAnswers = [...prev];
        updatedAnswers[existingAnswerIndex].answer = value;
        return updatedAnswers;
      } else {
        // Add a new answer
        return [
          ...prev,
          {
            question: question,
            answer: value,
          },
        ];
      }
    });
  }

  useEffect(() => {
    getQuizQuestions();
  }, []);

  const handleQuizFinish = (e) => {
    if (answers.length === questions.length) {
      setHasUnansweredQuestions(false);
      navigate("/results", {
        state: { answers: answers, questions: questions },
      });
    } else {
      e.preventDefault();
      setHasUnansweredQuestions(true);
    }
  };

  const questionsElements = questions.map((question, index) => {
    return (
      <div key={index}>
        <div className="singleQuestion">
          <h2>{question.question}</h2>
          <div className="choices">
            {question.choices.map((choice, aIndex) => {
              const answerIndex = answers.findIndex(
                (answer) => answer.question === question.question
              );
              const isPicked =
                answerIndex !== -1 && answers[answerIndex].answer === choice;

              return (
                <div key={aIndex}>
                  <label
                    htmlFor={decode(choice)}
                    className={`radio-button ${isPicked ? "picked" : ""}`}
                  >
                    {decode(choice)}
                    <input
                      type="radio"
                      id={decode(choice)}
                      name={`question_${index}`}
                      value={decode(choice)}
                      className="radio-button"
                      onChange={(e) =>
                        storeAnswers(question.question, e.target.value)
                      }
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

  console.log(answers);

  return (
    <div className="questionsSection">
      {questionsElements}
      {hasUnansweredQuestions && (
        <p className="submitMsg">
          Please answer all questions before submitting.
        </p>
      )}
      <button className="startBtn finishQuiz" onClick={handleQuizFinish}>
        Finish Quiz
      </button>
    </div>
  );
};

export default Quiz;
