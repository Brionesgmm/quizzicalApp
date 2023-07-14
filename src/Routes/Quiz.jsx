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

  return (
    <div>
      <h1>Quiz</h1>
    </div>
  );
};

export default Quiz;
