import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Optional: you can style if you want

const HomePage: React.FC = () => {
    return (
        <div className="home-container">
            <h1>Welcome to the DIY Home Improvement Toolkits</h1>
            <p>
                Plan your projects, estimate material costs, and track your progress.
            </p>
            <div className="home-actions">
                <Link to="/login">
                    <button className="primary-button">Login</button>
                </Link>
                <Link to="/register">
                    <button className="secondary-button">Register</button>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
