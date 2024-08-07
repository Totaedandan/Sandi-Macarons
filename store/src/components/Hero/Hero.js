import styles from './Hero.module.scss';
import slideImg1 from '../../assets/sandi_bg.jpg';
import { motion } from "framer-motion";
import { easeAnimate } from '../../animations/animation';
import { useStateContext } from '../../context/StateContextProvider';

const Hero = () => {
    const { handleScrollToProducts } = useStateContext();
    return (
        <motion.section variants={easeAnimate} initial="start" animate="end" className={styles.hero}>
            <div className={styles.heroWrapper}>
                <div className={styles.heroContent}>
                    <h1>У нас всегда<br/>свежие и вкусные десерты.</h1>
                    <p>Сделай свой день еще лучше вместе с Сәнді Macarons</p>
                    <button onClick={handleScrollToProducts}>Купить сейчас</button>
                </div>
                <div className={styles.imageWrapper}>
                    <img src={slideImg1} alt="Cake for hero section"/>
                    <div className={styles.gradientOverlay}></div>
                </div>
            </div>
        </motion.section>
    )
}

export default Hero