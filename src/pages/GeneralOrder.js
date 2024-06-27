import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Badge, Space, Input } from 'antd';
import OrderDetailModal from '../components/OrderDetailModal';
import './GeneralOrder.css';

const menuData = [
    { id: 1, name: '골드망고 스무디', price: 4000, category: '시즌 메뉴', image: '/images/goldmango_smoothie.jpg' },
    { id: 2, name: '코코넛 커피 스무디', price: 4800, category: '시즌 메뉴', image: '/images/coconut_coffee_smoothie.jpg' },
    { id: 3, name: '망고 코코넛 주스', price: 3800, category: '시즌 메뉴', image: '/images/mango_coconut_juice.jpg' },
    { id: 4, name: '망고 허니붕 코스티', price: 5800, category: '시즌 메뉴', image: '/images/mango_honey_comb.jpg' },
    { id: 5, name: '딸기 쿠키 프라페', price: 4900, category: '시즌 메뉴', image: '/images/strawberry_cookie_frappe.jpg' },
    { id: 6, name: '흑당 버블 라떼', price: 4800, category: '시즌 메뉴', image: '/images/black_sugar_bubble_latte.jpg' },
    { id: 7, name: '흑당 라떼', price: 5000, category: '시즌 메뉴', image: '/images/black_sugar_latte.jpg' },
    { id: 8, name: '아메리카노', price: 3000, category: '커피(ICE)', image: '../coffee/americano.jpg' },
    { id: 9, name: '라떼', price: 3500, category: '커피(ICE)', image: '../coffee/latte.jpg' },
    { id: 10, name: '모카', price: 4000, category: '커피(ICE)', image: '../coffee/mocha.jpg' },
    { id: 11, name: 'Lemonade', price: 3500, category: 'Ade', image: 'lemonade.jpg' },
];

const categories = ['시즌 메뉴','커피(ICE)','커피(HOT)'];

const GeneralOrder = () => {
    const [selectedCategory, setSelectedCategory] = useState('커피(ICE)');
    const [orderList, setOrderList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentOrder, setCurrentOrder] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);

    const navigate = useNavigate();

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleMenuClick = (menu) => {
        setCurrentOrder(menu);
        setModalVisible(true);
    };

    const handleAddToOrder = (order) => {
        const existingOrder = orderList.find(
            (item) => item.id === order.id && item.size === order.size
        );

        if (existingOrder) {
            existingOrder.count += order.count;
        } else {
            setOrderList([...orderList, order]);
        }

        setTotalPrice(totalPrice + order.price * order.count);
    };

    const handleIncrement = (order) => {
        order.count += 1;
        setOrderList([...orderList]);
        setTotalPrice(totalPrice + order.price);
    };

    const handleDecrement = (order) => {
        if (order.count > 1) {
            order.count -= 1;
            setOrderList([...orderList]);
            setTotalPrice(totalPrice - order.price);
        }
    };

    const handleConfirm = () => {
        navigate('/payment', { state: { orderList, totalPrice } });
    };

    const handleClear = () => {
        setOrderList([]);
        setTotalPrice(0);
    };

    return (
        <div className='general-order-container'>
            <div className='category-container'>
                <ul className='category-list'>
                    {categories.map((category) => (
                        <li key={category} onClick={() => handleCategoryChange(category)}>
                            {category}
                        </li>
                    ))}
                </ul>
            </div>
            <div className='menu-container'>
                <Row gutter={[16, 16]} className='menu-list'>
                    {menuData
                        .filter((menu) => menu.category === selectedCategory)
                        .map((menu) => (
                            <Col span={6} key={menu.id}>
                                <Card
                                    hoverable
                                    cover={<img alt={menu.name} src={menu.image} />}
                                    onClick={() => handleMenuClick(menu)}
                                >
                                    <Card.Meta title={menu.name} description={`${menu.price}￦`} />
                                </Card>
                            </Col>
                        ))}
                </Row>
            </div>
            <div className='order-summary'>
                <h2>주문 목록</h2>
                {orderList.map((order) => (
                    <Row key={order.id}>
                        <Col span={6}>
                            <Badge
                                count={order.size}
                                style={{ backgroundColor: order.size === 'Large' ? 'blue' : 'green' }}
                            />
                        </Col>
                        <Col span={12}>{order.name}</Col>
                        <Col span={6}>{order.price * order.count}￦</Col>
                        <Space>
                            <Button onClick={() => handleDecrement(order)}>-</Button>
                            <Input value={order.count} readOnly />
                            <Button onClick={() => handleIncrement(order)}>+</Button>
                        </Space>
                    </Row>
                ))}
                <div className='total'>
                    <h3>총 금액: {totalPrice}￦</h3>
                </div>
                <div className='actions'>
                    <Button type='primary' onClick={handleConfirm}>
                        결제하기
                    </Button>
                    <Button type='danger' onClick={handleClear}>
                        주문 취소
                    </Button>
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
