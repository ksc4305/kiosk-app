import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div className="order-box" onClick={() => navigate('/general-order')}>
                일반 주문
            </div>
            <div className="order-box" onClick={() => navigate('/ai-order')}>
                AI 주문
            </div>
        </div>
    );
};

export default Home;
