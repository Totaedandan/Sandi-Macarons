import React from 'react';
import styles from '../Footer/Footer.module.scss';
import logoImage from '../../assets/logo_macarons.png';

const Footer = () => {
  return (
    <footer id="contact-section" className={styles.footer}>
        <section className={styles.footerWrapper}>
            <div className={styles.footerContent}>
                <h1 className={styles.footerLogoName}>
                <div className={styles.footerLogoIcon}>
                    <img src={logoImage} alt="Sandi Macarons Logo" className={styles.footerLogoImage} />
                </div>
                    Cәнді Macarons
                </h1>
                <div className={styles.socialLinks}>
                    <a href="https://www.instagram.com/sandi_macarons/" target="_blank" rel="noreferrer"><i className="fa-brands fa-square-instagram fa-2xl"></i></a>
                    <a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><i className="fa-brands fa-square-facebook fa-2xl"></i></a>
                    <a href="https://www.blogger.com/" target="_blank" rel="noreferrer"><i className="fa-brands fa-blogger fa-2xl"></i></a>
                </div>
            </div>
            <div className={styles.footerContent}>
                <h3>Напишите нам</h3>
                <div>
                    <p>	город Астана, <br/>Улы Дала 45/1</p>
                    <p>+7-777-099-01-00</p>
                    <p>sandi.macarons@gmail.com</p>
                    <p><strong>Рабочее время:</strong><br/>Пн - Пт 08:30 - 20:00<br/>Сб - Вс: 10:00 - 18:00</p>
                </div>
            </div>
            <div className={styles.footerContentLinks}>
                <h3>Быстрый переход</h3>
                <div>
                    <p>Про нас</p>
                    <p>Сертефикаты</p>
                    <p>Правило & Защита</p>
                </div>
            </div>
            <div className={styles.footerContentLinks}>
                <h3>Ресурсы</h3>
                <div>
                    <p>Кол центр</p>
                    <p>Правила заказа</p>
                    <p>Сообщение</p>
                </div>
            </div>
        </section>
        <section className={styles.footerCredit}>
            <small>Designed and Developed by <a href="https://kristinedejesus.vercel.app" target="_blank" rel="noreferrer noopener">Tolebi Baitassov</a></small>
        </section>
    </footer>
  )
}

export default Footer