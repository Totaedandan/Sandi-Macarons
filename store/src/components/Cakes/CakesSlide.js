import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import styles from "./Cakes.module.scss";
// swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { useStateContext } from '../../context/StateContextProvider';
import axios from "axios";


const CakesSlide = ({currentCake}) => {
  const { formatPrice } = useStateContext();
  const [cakes, setCakes] = useState();
  
  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

    const fetchProducts = async () => {
        try {
            const {data} = await axios.get('http://localhost:8080/admin');
            setCakes(data);
            console.log(data)
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

  useEffect(() => {
      fetchProducts()
  }, [])

  return (
    <section className={styles.cakesSlide}>
        <h3>Вам Могут Еще Понравится:</h3>
        <div className={styles.slideWrapper}>
            <Swiper
                spaceBetween={10}
                loop={true}
                autoplay={{
                    delay: 800,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                modules={[Pagination, Autoplay]}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    375: {
                      width: 375,
                      slidesPerView: 2,
                    },
                    1440: {
                      width: 1440,
                      slidesPerView: 4,
                    },
                }}
                style={{position: "relative"}}
            >
                {
                    currentCake && 
                    cakes.filter(list => list.slug !== currentCake.slug).map((lists, index) => (
                        (
                           <SwiperSlide key={index}>
                               <Link to={`/cakes/${lists.slug}`} className={styles.cardLink} onClick={scrollToTop}>
                                   <img className={styles.cakeImage} src={`http://localhost:8080${lists.images[0]}`} alt={lists.cakeName} />
                                   <div className={styles.cakeDetails}>
                                       <p className={styles.cakeName}>{lists.cakeName}</p>
                                       <p className={styles.cakePrice}>${formatPrice(lists.details.price)}</p>
                                   </div>
                               </Link>
                           </SwiperSlide>
                        )
                    ))
                }
            </Swiper>
        </div>
    </section>
  )
}

export default CakesSlide;