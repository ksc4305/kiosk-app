import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GeneralOrder from './pages/GeneralOrder';
import AIOrder from './pages/AIOrder';
import Payment from './pages/Payment';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/general-order" element={<GeneralOrder />} />
                <Route path="/ai-order" element={<AIOrder />} />
                <Route path="/payment" element={<Payment />} />
            </Routes>
        </Router>
    );
}

export default App;
