import './quiz.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Quiz = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const navigate = useNavigate();
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/questions/bycategory/${id}`
        );
        setQuestions(shuffleArray(response.data));
      } catch (error) {
        console.error('Failed to fetch questions:', error);
      }
    };
    fetchQuestions();
  }, [id]);

  const handleAnswer = selectedOption => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[currentQuestion] = selectedOption;
    setSelectedOptions(updatedSelectedOptions);

    const questionId = questions[currentQuestion]._id;
    const existingAnswerIndex = answers.findIndex(
      answer => answer.questionid === questionId
    );

    if (existingAnswerIndex !== -1) {
      const updatedAnswers = [...answers];
      updatedAnswers[existingAnswerIndex].selectedoption = selectedOption;
      setAnswers(updatedAnswers);
    } else {
      setAnswers([
        ...answers,
        { questionid: questionId, selectedoption: selectedOption },
      ]);
    }
  };

  const handleNext = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFinish = async () => {
    try {
      const username = localStorage.getItem('username');
      const response = await axios.post(
        'http://localhost:8000/questions/submit',
        {
          username,
          answers,
          category: id,
        }
      );
      navigate('/results', {
        state: {
          score: response.data.score,
          category: id,
          count: currentQuestion + 1,
        },
      });
    } catch (error) {
      console.error('Failed to submit answers:', error);
    }
  };

  if (!questions.length) {
    return <p>Loading questions...</p>;
  }

  return (
    <div className="quiz">
      <div className="quiz-container">
        <h2>{id} Quiz</h2>
        <div className="question-section">
          <p>
            <strong>Question {currentQuestion + 1}:</strong>{' '}
            {questions[currentQuestion].question}
          </p>
          <div className="options-section">
            {questions[currentQuestion].options.map((option, index) => {
              const isSelected = selectedOptions[currentQuestion] === option;
              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`option-button ${isSelected ? 'selected' : ''}`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
        <div className="navigation-section">
          <button
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className="nav-button"
          >
            &lt; Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentQuestion + 1 === questions.length}
            className="nav-button"
          >
            Next &gt;
          </button>
          {currentQuestion + 1 === questions.length && (
            <button onClick={handleFinish} className="finish-button">
              Finish Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
