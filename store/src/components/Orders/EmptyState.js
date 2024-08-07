import React from 'react';
import styles from '../Orders/Orders.module.scss';
import emptyCart from '../../assets/empty-cart.png';
import { useStateContext } from '../../context/StateContextProvider';

export default function EmptyState() {
  const { handleScrollToProducts } = useStateContext();
  return (
    <div className={styles.ordersEmpty}>
        <img src={emptyCart} alt="Illustration of empty cart" />
        <p>Ваша корзина пуста<br/>
        <span>давайте заполним ее</span></p>
        <button onClick={handleScrollToProducts}>Купить</button>
    </div>
  )
}
