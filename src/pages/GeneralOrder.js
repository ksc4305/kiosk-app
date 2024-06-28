import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Badge, Space } from 'antd';
import { HomeOutlined, DeleteOutlined } from '@ant-design/icons';
import OrderDetailModal from '../components/OrderDetailModal';
import './GeneralOrder.css';

const menuData = [
    { id: 1, name: '골드망고 스무디', price: 4000, type: '시즌 메뉴', image: '/images/goldmango_smoothie.jpg' },
    { id: 2, name: '코코넛 커피 스무디', price: 4800, type: '시즌 메뉴', image: '/images/coconut_coffee_smoothie.jpg' },
    { id: 3, name: '망고 코코넛 주스', price: 3800, type: '시즌 메뉴', image: '/images/mango_coconut_juice.jpg' },
    { id: 4, name: '망고 허니붕 코스티', price: 5800, type: '시즌 메뉴', image: '/images/mango_honey_comb.jpg' },
    { id: 5, name: '딸기 쿠키 프라페', price: 4900, type: '시즌 메뉴', image: '/images/strawberry_cookie_frappe.jpg' },
    { id: 6, name: '흑당 버블 라떼', price: 4800, type: '시즌 메뉴', image: '/images/black_sugar_bubble_latte.jpg' },
    { id: 7, name: '흑당 라떼', price: 5000, type: '시즌 메뉴', image: '/images/black_sugar_latte.jpg' },
    { id: 8, name: '아메리카노', price: 3000, type: '커피', image: '../coffee/americano.jpg' },
    { id: 9, name: '라떼', price: 3500, type: '커피', image: '../coffee/latte.jpg' },
    { id: 10, name: '모카', price: 4000, type: '커피', image: '../coffee/mocha.jpg' },
    { id: 11, name: 'Lemonade', price: 3500, type: 'Ade', image: 'lemonade.jpg' },
];

const categories = ['시즌 메뉴', '커피', '에이드'];

const GeneralOrder = () => {
    const [selectedType, setSelectedType] = useState('커피');
    const [orderList, setOrderList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentOrder, setCurrentOrder] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [timeLeft, setTimeLeft] = useState(120);

    const navigate = useNavigate();

    useEffect(() => {
        if (timeLeft <= 0) {
            navigate('/');
        }
        const timer = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft, navigate]);

    const handleTypeChange = (type) => {
        setSelectedType(type);
    };

    const handleMenuClick = (menu) => {
        if (menu.type === '커피') {
            setCurrentOrder({ ...menu, temperature: 'ICE' }); // Default temperature to ICE for coffee items
            setModalVisible(true);
            setTimeLeft(120); // Reset timer on menu click
        } else {
            setCurrentOrder(menu); // For non-coffee items, no temperature selection needed
            setModalVisible(true);
            setTimeLeft(120); // Reset timer on menu click
        }
    };

    const handleAddToOrder = (order) => {
        // Adjust price for HOT drinks (500원 discount)
        if (order.temperature === 'HOT') {
            order.price -= 500;
        }

        const existingOrder = orderList.find(
            (item) => item.id === order.id && item.size === order.size && item.temperature === order.temperature
        );

        if (existingOrder) {
            existingOrder.count += order.count;
            existingOrder.totalPrice = existingOrder.count * existingOrder.price; // Update total price
        } else {
            const newOrder = {
                ...order,
                totalPrice: order.count * order.price, // Calculate total price for the new order
            };
            setOrderList([...orderList, newOrder]);
        }

        setTotalPrice(totalPrice + order.price * order.count);
    };

    const handleIncrement = (order) => {
        order.count += 1;
        order.totalPrice = order.count * order.price; // Update total price
        setOrderList([...orderList]);
        setTotalPrice(totalPrice + order.price);
        setTimeLeft(120); // Reset timer on increment
    };

    const handleDecrement = (order) => {
        if (order.count > 1) {
            order.count -= 1;
            order.totalPrice = order.count * order.price; // Update total price
            setOrderList([...orderList]);
            setTotalPrice(totalPrice - order.price);
            setTimeLeft(120); // Reset timer on decrement
        }
    };

    const handleRemoveItem = (orderToRemove) => {
        const filteredOrders = orderList.filter((order) => order.id !== orderToRemove.id);
        setOrderList(filteredOrders);
        setTotalPrice(totalPrice - (orderToRemove.price * orderToRemove.count));
        setTimeLeft(120); // Reset timer on item removal
    };

    const handleConfirm = () => {
        navigate('/payment', { state: { orderList, totalPrice } });
    };

    const handleClear = () => {
        setOrderList([]);
        setTotalPrice(0);
        setTimeLeft(120); // Reset timer on clear
    };

    return (
        <div className='general-order-container'>
            <div className='header-container'>
                <Button type="link" icon={<HomeOutlined />} onClick={() => navigate('/')} />
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h1 className='company-name'>ChosunCafe</h1>
                    <ul className='category-list'>
                        {categories.map((category) => (
                            <li key={category} onClick={() => handleTypeChange(category)}>
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='menu-container'>
                <Row gutter={[16, 16]} className='menu-list'>
                    {menuData
                        .filter((menu) => menu.type === selectedType)
                        .map((menu) => (
                            <Col span={6} key={menu.id}>
                                <Card
                                    hoverable
                                    cover={<img alt={menu.name} src={menu.image} />}
                                    onClick={() => handleMenuClick(menu)}
                                >
                                    <Card.Meta title={menu.name} description={<span style={{ color: 'chocolate' }}>{menu.price}원</span>} />
                                </Card>
                            </Col>
                        ))}
                </Row>
            </div>
            <div className='order-summary'>
                <h2>주문 목록</h2>
                {orderList.map((order) => (
                    <div key={order.id} className='order-item-box'>
                        <Row className='order-item'>
                            <Col span={4}>
                                <img
                                    src={order.image}
                                    alt={order.name}
                                    style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden' }}
                                />
                            </Col>
                            <Col span={8}>
                                <Badge
                                    count={order.size}
                                    style={{ backgroundColor: order.size === 'Large' ? 'blue' : 'green' }}
                                />
                                <br />
                                {order.name} {order.temperature === 'HOT' ? '(HOT)' : '(ICE)'}
                                <br />
                                <span style={{ color: 'chocolate' }}>{order.price}원</span>
                            </Col>
                            <Col span={6}>
                                <Space style={{ marginRight: '8px' }}>
                                    <Button onClick={() => handleDecrement(order)}>-</Button>
                                    {order.count}
                                    <Button onClick={() => handleIncrement(order)}>+</Button>
                                </Space>
                                <br />
                                <span style={{ color: 'gray' }}>{order.totalPrice}원</span>
                            </Col>
                            <Col span={6}>
                                <Button type="text" onClick={() => handleRemoveItem(order)} icon={<DeleteOutlined />} />
                            </Col>
                        </Row>
                    </div>
                ))}
                <div className='total'>총 가격: {totalPrice}원</div>
                <div className='actions'>
                    <Button type="primary" onClick={handleConfirm}>결제</Button>
                    <Button type="danger" onClick={handleClear}>전체 삭제</Button>
                </div>
                <div className='timer'>
                    남은 시간: <span style={{ color: 'orange' }}>{timeLeft}초</span>
                </div>
            </div>
            <OrderDetailModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                menu={currentOrder}
                onAddToOrder={handleAddToOrder}
            />
        </div>
    );
};

export default GeneralOrder;
