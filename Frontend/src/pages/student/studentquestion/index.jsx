import './studentquestion.css';
import './studentQuestion.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../../utils/axios';

const StudentQuestion = () => {
  const { category } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const navigate = useNavigate();

  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem('token');
        const instituteCode = localStorage.getItem('code');

        if (!token || !instituteCode) {
          console.error('Token or instituteCode is missing');
          return;
        }

        const response = await axios.get(
          `/teacherquestions/my-questions/${category}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setQuestions(shuffleArray(response.data));
      } catch (error) {
        console.error(
          'Failed to fetch questions:',
          error.response?.data || error
        );
      }
    };

    fetchQuestions();
  }, [category]);

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
      console.log(answers);
      const username = localStorage.getItem('username');
      const response = await axios.post('/teacherquestions/score', {
        username,
        answers,
        category: category,
      });
      navigate('/studentscore', {
        state: {
          score: response.data.score,
          category: category,
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
    <div className="student-question">
      <div className="student-question-container">
        <h2>{category} Questions</h2>
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

export default StudentQuestion;
