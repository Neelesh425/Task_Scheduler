import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './index.scss';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    // Add your authentication logic here
    // For now, just store in localStorage and navigate
    localStorage.setItem('user', JSON.stringify({ email: formData.email }));
    navigate('/todo');
  };

  return (
    <div className="signin">
      <div className="signin__container">
        <div className="signin__header">
          <h1>Welcome Back</h1>
          <p>Sign in to continue to your tasks</p>
        </div>

        <form className="signin__form" onSubmit={handleSubmit}>
          {error && <div className="signin__error">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="signin__button">
            Sign In
          </button>

          <div className="signin__footer">
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;