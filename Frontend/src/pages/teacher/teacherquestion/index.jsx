import './teacherquestion.css';
import React, { useState, useEffect } from 'react';
import axios from '../../../utils/axios';
import { useParams } from 'react-router-dom';
import { useRef } from 'react';

const QuestionManagement = () => {
  const questionInputRef = useRef(null);
  const { category } = useParams();
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState('');
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState(null);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `/teacherquestions/my-questions/${category}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setQuestions(response.data);
    } catch (err) {
      setError('Failed to fetch questions');
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [category]);

  const handleEditQuestion = question => {
    setEditMode(true);
    setEditingQuestionId(question._id);
    setNewQuestion(question.question);
    setOptions([...question.options]);
    setCorrectOption(question.correctanswer);
    {
      setTimeout(() => {
        questionInputRef.current?.focus();
      }, 100);
    }
  };

  const handleSaveQuestion = async () => {
    if (
      !newQuestion.trim() ||
      options.some(opt => opt.trim() === '') ||
      !correctOption.trim()
    ) {
      setError('All fields are required.');
      return;
    }

    try {
      if (editMode) {
        await axios.patch(
          `/teacherquestions/update/${editingQuestionId}`,
          { question: newQuestion, options, correctanswer: correctOption },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        setQuestions(
          questions.map(q =>
            q._id === editingQuestionId
              ? {
                  ...q,
                  question: newQuestion,
                  options,
                  correctanswer: correctOption,
                }
              : q
          )
        );

        setEditMode(false);
        setEditingQuestionId(null);
      } else {
        const response = await axios.post(
          '/teacherquestions/add/' + category,
          {
            category,
            question: newQuestion,
            options,
            correctanswer: correctOption,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        fetchQuestions();
      }

      setNewQuestion('');
      setOptions(['', '', '', '']);
      setCorrectOption('');
      setError(null);
    } catch (err) {
      setError('Failed to save question');
    }
  };

  const handleDeleteQuestion = async questionId => {
    try {
      await axios.delete(`/teacherquestions/delete/${questionId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setQuestions(questions.filter(q => q._id !== questionId));
    } catch (err) {
      setError('Failed to delete question');
    }
  };

  return (
    <div className="question-container">
      <h1 className="question-title">📝 Manage Questions </h1>
      <h2 className="question-category">{category}</h2>

      <div className="add-question">
        <textarea
          ref={questionInputRef}
          placeholder="Enter question text"
          value={newQuestion}
          onChange={e => setNewQuestion(e.target.value)}
        />
        <div className="options-input">
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={e => {
                const newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
              }}
            />
          ))}
        </div>
        <input
          type="text"
          placeholder="Enter correct option"
          value={correctOption}
          onChange={e => setCorrectOption(e.target.value)}
        />
        <button onClick={handleSaveQuestion}>
          {editMode ? 'Update Question' : 'Add Question'}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="question-list">
        {questions.length > 0 ? (
          <ul>
            {questions.map(question => (
              <li key={question._id} className="question-item">
                <p>
                  <strong>Q:</strong> {question.question}
                </p>
                <ul>
                  {question.options ? (
                    question.options.map((opt, i) => <li key={i}>{opt}</li>)
                  ) : (
                    <></>
                  )}
                </ul>
                <p>
                  <strong>Correct:</strong> {question.correctanswer}
                </p>
                <button
                  className="editbutton"
                  onClick={() => handleEditQuestion(question)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="deletebutton"
                  onClick={() => handleDeleteQuestion(question._id)}
                >
                  ❌ Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No questions added yet.</p>
        )}
      </div>
    </div>
  );
};

export default QuestionManagement;
