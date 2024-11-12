import React, { useState, useEffect } from 'react';
import { FaLightbulb, FaLaptop, FaFan } from 'react-icons/fa';
import { ordersData as initialOrdersData } from '../../data';
import css from './Orders.module.css';

const Orders = () => {
    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem('orders');
        return savedOrders ? JSON.parse(savedOrders) : initialOrdersData;
    });

    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    const toggleOrder = async (index) => {
        const updatedOrders = orders.map((order, i) =>
            i === index ? { ...order, isOn: !order.isOn } : order
        );
        setOrders(updatedOrders);

        const order = updatedOrders[index];
        const device = order.name;
        const status = order.isOn ? 'on' : 'off';

        try {
            const response = await fetch('http://localhost:8000/api/control', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ device, status }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error calling API:', error);
        }
    };

    const getIcon = (name, isOn) => {
        switch (name) {
            case 'led':
                return <FaLightbulb className={`${css.icon} ${isOn ? css.glow : ''}`} />;
            case 'laptop':
                return <FaLaptop className={`${css.icon} ${isOn ? css.glow : ''}`} />;
            case 'fan':
                return <FaFan className={`${css.icon} ${isOn ? css.spin : ''}`} />;
            default:
                return null;
        }
    };

    return (
        <div className={`${css.container} theme-container`}>
            <div className={css.head}>
                <img src="./logo.png" alt="logo" />
                <span>On/Off device</span>
            </div>

            <div className={css.orders}>
                {orders.map((order, index) => (
                    <div key={index} className={css.order}>
                        <div className={css.orderHeader}>
                            {getIcon(order.name, order.isOn)}
                            <span>{order.name}</span>
                            <button
                                className={css.toggleButton}
                                onClick={() => toggleOrder(index)}
                            >
                                {order.isOn ? 'Turn Off' : 'Turn On'}
                            </button>
                        </div>
                        <div>
                            {/* Additional content */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
