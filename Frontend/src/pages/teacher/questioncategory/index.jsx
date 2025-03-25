import React, { useState, useEffect } from 'react';
import axios from '../../../utils/axios';
import './questioncategory.css';
import { Link } from 'react-router-dom';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/categories/all', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCategories(response.data);
    } catch (err) {
      setError('Failed to fetch categories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      setError('Category name cannot be empty');
      return;
    }

    try {
      const response = await axios.post(
        '/categories/add',
        { category: newCategory },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      fetchCategories();
      setNewCategory('');
      setError(null);
    } catch (err) {
      setError('Failed to add category');
    }
  };

  const handleDeleteCategory = async category => {
    try {
      await axios.delete(`/categories/delete/${category._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      await axios.delete(`/teacherquestions/deleteall/${category.category}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      fetchCategories();
    } catch (err) {
      setError('Failed to delete category');
    }
  };

  return (
    <div className="category-container">
      <h1 className="category-title">📚 Manage Categories</h1>

      <div className="add-category">
        <input
          type="text"
          placeholder="Enter category name"
          value={newCategory}
          onChange={e => setNewCategory(e.target.value)}
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="category-list">
        {categories.length > 0 ? (
          <ul>
            {categories.map(category => (
              <li key={category._id}>
                <Link
                  to={`/teacherquestion/${category.category}`}
                  className="category-link"
                >
                  {category.category}
                </Link>
                <button onClick={() => handleDeleteCategory(category)}>
                  ❌ Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No categories available.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryManagement;
