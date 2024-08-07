import styles from './Cakes.module.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useStateContext } from '../../context/StateContextProvider';
import CakesSlide from './CakesSlide';

const CakeDetails = () => {
  const { cake, displayCakeDetails, quantity, increaseQty, decreaseQty, formatPrice, onAddClick } = useStateContext();
  const { slug } = useParams();
  const navigate = useNavigate();

  const [cakeDetails, setCakeDetails] = useState(null);
  const [cakeImage, setCakeImage] = useState(0);

  const fetchCakeDetails = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/admin/cakes/${slug}`);
      setCakeDetails(data);
      displayCakeDetails(data);
    } catch (error) {
      console.error('Error fetching cake details:', error);
    }
  };

  const makeOrder = () => {
    if (!cakeDetails) return;

    const message = `Я хочу заказать:\n${cakeDetails.cakeName}\nКоличество: ${quantity}\nИтоговая сумма: ${formatPrice(cakeDetails.details.price * quantity)}`;
    const encodedMessage = encodeURIComponent(message);

    const phoneNumber = "+77083120167";
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    window.location.href = whatsappUrl;
  };

  useEffect(() => {
    fetchCakeDetails();
  }, [slug]);

  const handleClickImage = (id) => {
    setCakeImage(id);
  };

  return (
      <>
        <div className={styles.cakeDetailsPage}>
          <button className={styles.goBackBtn} onClick={() => navigate(-1)}>Назад</button>
          {
              cakeDetails && (
                  <div className={styles.cakeDetailed}>
                    <div>
                      <div className={styles.cakeDetailsImage}>
                        <img id={cakeImage} src={`http://localhost:8080${cakeDetails.images[cakeImage]}`} alt={`Reference photos for ${cakeDetails.cakeName}`}/>
                      </div>
                      <div className={styles.cakeImageReferences}>
                        {cakeDetails.images.map((img, index) => (
                            <img
                                key={index}
                                id={index}
                                className={cakeImage === index ? styles.activeImage : undefined}
                                src={`http://localhost:8080${img}`}
                                alt={`Additional reference photos`}
                                onClick={() => handleClickImage(index)}
                            />
                        ))}
                      </div>
                    </div>
                    <div>
                      <h2>{cakeDetails.cakeName}</h2>
                      <p>₸{formatPrice(cakeDetails.details.price)}</p>
                      <div className={styles.quantityCount}>
                        <span>Количество: </span>
                        <div className={styles.quantity}>
                          <i className="fa-solid fa-minus fa-xs" onClick={decreaseQty}></i>
                          <span>{quantity}</span>
                          <i className="fa-solid fa-plus fa-xs" onClick={increaseQty}></i>
                        </div>
                      </div>
                      <button className={styles.addToCart} onClick={(e) => onAddClick(cakeDetails, e.target.innerText)}>Добавить в Корзину</button>
                      <button className={styles.buyNow} onClick={makeOrder}>Купить сейчас</button>
                      <h3>Подробнее:</h3>
                      <ul>
                        {cakeDetails.details.description.map(desc => <li style={{listStylePosition: "inside"}} key={desc}>{desc}</li>)}
                      </ul>
                    </div>
                  </div>
              )
          }
        </div>
        <CakesSlide currentCake={cakeDetails} formatPrice={formatPrice} />
      </>
  );
}

export default CakeDetails;
