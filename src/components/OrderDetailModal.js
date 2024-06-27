// import React, { useState } from 'react';
// import { Modal, Button, Radio, InputNumber, Checkbox } from 'antd';

// const OrderDetailModal = ({ visible, onClose, menu, onAddToOrder }) => {
//     const [size, setSize] = useState('Regular');
//     const [count, setCount] = useState(1);
//     const [toppings, setToppings] = useState([]);
//     const toppingOptions = ['Extra shot', 'Whipped cream', 'Syrup'];

//     const handleSizeChange = (e) => {
//         setSize(e.target.value);
//     };

//     const handleCountChange = (value) => {
//         setCount(value);
//     };

//     const handleToppingChange = (checkedValues) => {
//         setToppings(checkedValues);
//     };

//     const handleAdd = () => {
//         const priceMultiplier = size === 'Large' ? 1.5 : 1;
//         const toppingPrice = toppings.length * 500;
//         const order = {
//             ...menu,
//             size,
//             count,
//             toppings,
//             price: menu.price * priceMultiplier + toppingPrice,
//         };
//         onAddToOrder(order);
//         onClose();
//     };

//     return (
//         <Modal visible={visible} onCancel={onClose} footer={null}>
//             <h2>{menu.name}</h2>
//             <div>
//                 <span>크기 선택: </span>
//                 <Radio.Group onChange={handleSizeChange} value={size}>
//                     <Radio value="Regular">Regular</Radio>
//                     <Radio value="Large">Large</Radio>
//                 </Radio.Group>
//             </div>
//             <div>
//                 <span>토핑 선택: </span>
//                 <Checkbox.Group options={toppingOptions} onChange={handleToppingChange} />
//             </div>
//             <div>
//                 <span>수량 선택: </span>
//                 <InputNumber min={1} value={count} onChange={handleCountChange} />
//             </div>
//             <div>
//                 <Button type="primary" onClick={handleAdd}>
//                     선택 완료
//                 </Button>
//                 <Button onClick={onClose}>취소</Button>
//             </div>
//         </Modal>
//     );
// };

// export default OrderDetailModal;


import React, { useState } from 'react';
import { Modal, Button, Radio, InputNumber, Checkbox } from 'antd';

const OrderDetailModal = ({ visible, onClose, menu, onAddToOrder }) => {
    const [size, setSize] = useState('Regular');
    const [count, setCount] = useState(1);
    const [toppings, setToppings] = useState([]);
    const toppingOptions = ['Extra shot', 'Whipped cream', 'Syrup'];

    const handleSizeChange = (e) => {
        setSize(e.target.value);
    };

    const handleCountChange = (value) => {
        setCount(value);
    };

    const handleToppingChange = (checkedValues) => {
        setToppings(checkedValues);
    };

    const handleAdd = () => {
        const priceMultiplier = size === 'Large' ? 1.5 : 1;
        const toppingPrice = toppings.length * 500;
        const order = {
            ...menu,
            size,
            count,
            toppings,
            price: menu.price * priceMultiplier + toppingPrice,
        };
        onAddToOrder(order);
        onClose();
    };

    return (
        <Modal visible={visible} onCancel={onClose} footer={null}>
            <h2>{menu.name}</h2>
            <div>
                <span>크기 선택: </span>
                <Radio.Group onChange={handleSizeChange} value={size}>
                    <Radio value="Regular">Regular</Radio>
                    <Radio value="Large">Large</Radio>
                </Radio.Group>
            </div>
            <div>
                <span>수량 선택: </span>
                <InputNumber min={1} value={count} onChange={handleCountChange} />
            </div>
            <div>
                <Button type="primary" onClick={handleAdd}>
                    선택 완료
                </Button>
                <Button onClick={onClose}>취소</Button>
            </div>
        </Modal>
    );
};

export default OrderDetailModal;
