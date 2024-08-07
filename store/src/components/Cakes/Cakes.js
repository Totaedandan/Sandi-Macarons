import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/StateContextProvider";
import styles from "./Cakes.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { easeAnimate } from "../../animations/animation";
import axios from "axios";

const CakeList = () => {
    const { formatPrice, scrollToTop, cakeRef } = useStateContext();
    const [cakes, setCakes] = useState([]);
    const categoryList = ["Все Товары", "Макаронсы", "Сеты", "Ещё"];
    const [cakeCategory, setCakeCategory] = useState("Все Товары");
    const [cakeFilter, setCakeFilter] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleCakeCategory = (e) => {
        setCakeCategory(e.target.innerText);
    };

    const fetchCakes = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('http://localhost:8080/admin');
            setCakes(data);
            setCakeFilter(data);
        } catch (error) {
            console.error('Error fetching cakes:', error);
        } finally {
            setLoading(false);
        }
    };

    /* Filter Cakes */
    const filterCake = () => {
        if (cakeCategory === "Все Товары") {
            setCakeFilter([...cakes]);
            console.log(cakes)
        } else {
            setCakeFilter(cakes.filter(cake =>
                cake.category.toLowerCase().includes(cakeCategory.toLowerCase())
            ));
        }
        console.log(cakeCategory)
        console.log(cakeFilter)
    };

    useEffect(() => {
        fetchCakes();
    }, []);

    useEffect(() => {
        filterCake(); // Apply filter whenever cakes or category changes
    }, [cakes, cakeCategory]); // Add cakes as dependency

    return (
        <section ref={cakeRef} id="cakes-section" className={styles.cakesMenu}>
            <div className={styles.cakesWrapper}>
                <h2>Наши продукты</h2>
                <div className={styles.cakeCategory}>
                    {categoryList.map((category, index) => (
                        <span
                            key={index}
                            className={cakeCategory === category ? `${styles.activeCategory}` : null}
                            onClick={handleCakeCategory}
                        >
                            {category}
                        </span>
                    ))}
                </div>
                <div className={styles.dividerLine}></div>
                {loading ? (
                    <div>Загрузка...</div>
                ) : (
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 3 }}>
                        <AnimatePresence>
                            {cakeFilter.map(cake => (
                                <Grid key={cake._id} item xs={6} md={4} mb={5}>
                                    <motion.div
                                        key={cake._id}
                                        variants={easeAnimate}
                                        initial="start"
                                        animate="end"
                                        exit="exit"
                                    >
                                        <Link
                                            to={`/cakes/${cake.slug}`}
                                            className={styles.cardLink}
                                            onClick={scrollToTop}
                                        >
                                            <div className={styles.cakeImage}>
                                                <img
                                                    src={`http://localhost:8080${cake.images[0]}`}
                                                    alt={`${cake.cakeName} display`}
                                                />
                                            </div>
                                            <div className={styles.cakeDetails}>
                                                <p className={styles.cakeName}>{cake.cakeName}</p>
                                                <p className={styles.cakePrice}>₸{formatPrice(cake.details.price)}</p>
                                            </div>
                                        </Link>
                                    </motion.div>
                                </Grid>
                            ))}
                        </AnimatePresence>
                    </Grid>
                )}
            </div>
        </section>
    );
};

export default CakeList;
