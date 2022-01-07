import React, { useState, useEffect } from "react";
import axios from "axios";
function QuizDetail(props) {
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [clickedAnswer, setClickedAnswer] = useState([]);
  const [score, setScore] = useState(0);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/api/v1/quizs/" + props.match.params.id, {
        headers: {
          Authorization: `Basic ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        setQuestions(result.data.data.questions);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.error.error);
        setLoading(false);
      });
  }, []);

  const handleAnswerButtonClick = (e, i) => {
    const nextQuestion = currentQuestion + 1;
    setClickedAnswer((clickedAnswer) => [...clickedAnswer, i + "." + e]);

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  const startHandler = () => {
    setShowScore(false);
    setClickedAnswer("");
    setCurrentQuestion(0);
  };

  if (error) return <div className="notification is-danger">{error}</div>;
  return (
    <div className="h-screen mt-20">
      {loading && <div className="text-center">Уншиж байна</div>}
      {!showScore ? (
        <div className="bg-gray-900 w-4/12 mx-auto p-5 h-60">
          {questions !== null ? (
            <div className="">
              <div className="flex text-gray-100 text-md font-semibold mb-4 ">
                <div className="mr-2">{`${currentQuestion + 1}. `}</div>
                <div>{questions[currentQuestion].question}</div>
              </div>
              {questions[currentQuestion].answers.map((e, i) => {
                return (
                  <div
                    key={i}
                    className="flex text-gray-400 px-4 py-2 bg-transparent hover:bg-gray-800 cursor-pointer "
                    onClick={() => {
                      handleAnswerButtonClick(e, i);
                    }}
                  >
                    <div className="mr-2">{`${i + 1}.`}</div>
                    <div>{e}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="w-4/12  mx-auto bg-gray-900 p-5 ">
          <div className="text-center font-semibold text-gray-300 text-lg">
            Хариу
          </div>
          {clickedAnswer.map((e, i) => {
            return (
              <div className="">
                <div className="flex font-semibold text-gray-400 text-mdө ">
                  <div className="mr-2 ">{`${i + 1}.`}</div>
                  <div className=""> {questions[i].question}</div>
                </div>

                <div className="flex">
                  <div className="text-white w-full bg-green-600  px-4 my-1">
                    {e ===
                    questions[i].correctAnswer -
                      1 +
                      "." +
                      questions[i].answers[questions[i].correctAnswer - 1] ? (
                      ""
                    ) : (
                      <div>
                        {questions[i].correctAnswer -
                          1 +
                          "." +
                          questions[i].answers[questions[i].correctAnswer - 1]}
                      </div>
                    )}
                  </div>
                </div>
                {questions[i].answers[questions[i].correctAnswer - 1] !==
                e.split(".")[1] ? (
                  <div className="bg-red-600 text-white  px-4 my-1">{e}</div>
                ) : (
                  <div className="bg-green-600 text-white  px-4 my-1">{e}</div>
                )}
              </div>
            );
          })}
          <button
            onClick={startHandler}
            className="text-gray-100 py-1 px-4 border-2 border-white hover:border-transparent mt-8"
          >
            Дахин эхлэх
          </button>
        </div>
      )}
    </div>
  );
}

export default QuizDetail;
