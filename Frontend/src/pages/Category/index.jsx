import { useNavigate } from 'react-router-dom';
import './category.css';

const Category = () => {
  const navigate = useNavigate();

  return (
    <div className="category">
      <div className="outline">
        <h2 className="category-h2">Select a Category</h2>
        <div className="cards">
          <div
            className="card biologycard"
            onClick={() => navigate('/quiz/Biology')}
          >
            <span>BIOLOGY</span>
          </div>
          <div
            className="card mathscard"
            onClick={() => navigate('/quiz/Mathematics')}
          >
            <span>MATHEMATICS</span>
          </div>
          <div
            className="card physicscard"
            onClick={() => navigate('/quiz/Physics')}
          >
            <span>PHYSICS</span>
          </div>
          <div
            className="card chemistrycard"
            onClick={() => navigate('/quiz/Chemistry')}
          >
            <span>CHEMISTRY</span>
          </div>
          <div
            className="card gkcard"
            onClick={() => navigate('/quiz/GeneralKnowledge')}
          >
            <span>G. K</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
