import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const OrderDetailModal = ({ visible, onClose, menu, onAddToOrder }) => {
    const [size, setSize] = useState('Regular');
    const [count, setCount] = useState(1);
    const [temperature, setTemperature] = useState('ICE'); // Added state for ICE or HOT selection

    const handleSizeChange = (selectedSize) => {
        setSize(selectedSize);
    };

    const handleCountChange = (value) => {
        setCount(value);
    };

    const handleTemperatureChange = (selectedTemperature) => {
        // Allow temperature change only for coffee items
        if (menu.type === '커피') {
            setTemperature(selectedTemperature);
        }
    };

    const handleAdd = () => {
        const priceMultiplier = size === 'Large' ? 1.5 : 1;
        const order = {
            ...menu,
            size,
            count,
            temperature, // Include temperature in the order
            price: menu.price * priceMultiplier
        };
        onAddToOrder(order);
        onClose();
    };

    return (
        <Modal visible={visible} onCancel={onClose} footer={null}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <img
                    src={menu.image}
                    alt={menu.name}
                    style={{ width: '80px', height: '80px', marginRight: '10px', borderRadius: '50%' }}
                />
                <h2>{menu.name}</h2>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <Button.Group>
                    <Button
                        type={size === 'Regular' ? 'primary' : 'default'}
                        onClick={() => handleSizeChange('Regular')}
                    >
                        Regular
                    </Button>
                    <Button
                        type={size === 'Large' ? 'primary' : 'default'}
                        onClick={() => handleSizeChange('Large')}
                    >
                        Large
                    </Button>
                </Button.Group>
            </div>
            {menu.type === '커피' && (
                <div style={{ marginBottom: '10px' }}>
                    <Button.Group>
                        <Button
                            type={temperature === 'ICE' ? 'primary' : 'default'}
                            style={{ backgroundColor: temperature === 'ICE' ? 'blue' : 'white', color: temperature === 'ICE' ? 'white' : 'blue' }}
                            onClick={() => handleTemperatureChange('ICE')}
                        >
                            ICE
                        </Button>
                        <Button
                            type={temperature === 'HOT' ? 'primary' : 'default'}
                            style={{ backgroundColor: temperature === 'HOT' ? 'red' : 'white', color: temperature === 'HOT' ? 'white' : 'red' }}
                            onClick={() => handleTemperatureChange('HOT')}
                        >
                            HOT
                        </Button>
                    </Button.Group>
                </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <Button style={{ marginRight: '10px' }} onClick={() => setCount(count - 1)} disabled={count <= 1}>-</Button>
                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{count}</span>
                <Button style={{ marginLeft: '10px' }} onClick={() => setCount(count + 1)}>+</Button>
            </div>
            <div style={{ marginTop: '10px' }}>
                <Button type="primary" onClick={handleAdd}>
                    선택 완료
                </Button>
                <Button style={{ marginLeft: '10px' }} onClick={onClose}>취소</Button>
            </div>
        </Modal>
    );
};

export default OrderDetailModal;
