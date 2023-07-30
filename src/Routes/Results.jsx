import React from "react";
import { useLocation } from "react-router-dom";

const Results = () => {
  const location = useLocation();
  const { answers, questions } = location.state;
  console.log(answers);

  console.log(questions);
  return <div>Results</div>;
};

export default Results;
