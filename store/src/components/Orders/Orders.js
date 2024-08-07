import React from 'react';
import { useStateContext } from '../../context/StateContextProvider';
import styles from './Orders.module.scss';
import EmptyState from './EmptyState';

export default function Orders() {
    const { cartItems, handleRemoveCart, handleCartClick, totalPrice, cartItemQty, totalQty, formatPrice } = useStateContext();

    const makeOrder = () => {
        const cart = cartItems.map(item => ({
            name: item.cakeName,
            quantity: item.quantity,
            price: item.details.price
        }));

        let message = "Я хочу заказать:\n";
        let total = 0;

        cart.forEach(item => {
            message += `${item.name}\nКоличество: ${item.quantity}\n`;
            total += item.price * item.quantity;
        });
        message += `Итоговая сумма: ${formatPrice(total)}`;

        message = encodeURIComponent(message);

        const phoneNumber = "+77083120167";
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

        window.location.href = whatsappUrl;
    };

    return (
        <section className={styles.orders}>
            <div className={styles.ordersContainer}>
                <div className={styles.ordersHeader}>
                    <i className="fa-solid fa-chevron-left" onClick={handleCartClick}></i>
                    <span>Корзина ({totalQty})</span>
                </div>
                <div className={styles["orders-wrapper"]}>
                    {
                        totalQty !== 0 ? (
                            cartItems?.map((cake, index) => (
                                <div key={index} className={styles["order-content"]}>
                                    <i className="fa-solid fa-x" onClick={() => handleRemoveCart(cake)}></i>
                                    <div className={styles["order-img-wrapper"]}>
                                        <img src={`http://localhost:8080${cake.images[0]}`} alt={`${cake.cakeName}`} />
                                    </div>
                                    <div className="order-details">
                                        <div className={styles["cakeName-category"]}>
                                            <h3>{cake.cakeName}</h3>
                                            <p>{cake.category}</p>
                                        </div>
                                        <div className={styles.quantity}>
                                            <i className="fa-solid fa-minus fa-xs" onClick={() => cartItemQty("dec", cake.index)}></i>
                                            <span>{cake.quantity}</span>
                                            <i className="fa-solid fa-plus fa-xs" onClick={() => cartItemQty("inc", cake.index)}></i>
                                        </div>
                                    </div>
                                    <p className={styles["order-price"]}>{formatPrice(cake.details.price)} тг</p>
                                </div>
                            ))
                        ) : <EmptyState />
                    }
                </div>
                <div className={styles.totalSummary}>
                    <span>Вышло:</span>
                    <span>{formatPrice(totalPrice)} тг</span>
                </div>
                { totalQty !== 0 && <button className={styles["order__payment"]} onClick={makeOrder}>Заказать</button> }
            </div>
        </section>
    )
}
