import React from 'react';
import { useLocation } from 'react-router-dom';

const Payment = () => {
    const location = useLocation();
    const { orderList, totalPrice } = location.state;

    return (
        <div>
            <h1>결제 페이지</h1>
            <h2>주문 목록</h2>
            {orderList.map((order) => (
                <div key={order.id}>
                    <p>{order.name} - {order.size} - {order.count}개 - {order.price * order.count}￦</p>
                </div>
            ))}
            <h2>총 금액: {totalPrice}￦</h2>
            <button>결제 완료</button>
        </div>
    );
};

export default Payment;
