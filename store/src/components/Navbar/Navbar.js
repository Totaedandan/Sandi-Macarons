import { Link, NavLink } from 'react-router-dom';
import { useStateContext } from '../../context/StateContextProvider';
import styles from '../Navbar/Navbar.module.scss';
import logoImage from '../../assets/logo_macarons.png';


const Navbar = () => {
    const { handleCartClick, isNavOpen, handleNavLinks, handleNavMenu, totalQty } = useStateContext()

    return (
        <>
            <div className={styles.offset}></div>
            <nav className={styles.navbar}>
                <section className={styles.navWrapper}>
                    <div className={styles.rightLinks}>
                        <NavLink to="/#cakes" onClick={handleNavLinks("cakes")}>Макаронсы</NavLink>
                        <NavLink to='/about'>Про нас</NavLink>
                        <NavLink to="#contact" onClick={handleNavLinks("contact")}>Контакты</NavLink>
                    </div>
                    {
                        isNavOpen ?
                            <i className="fa-solid fa-x" onClick={handleNavMenu}></i> :
                            <div className={styles.navMenu} onClick={handleNavMenu}>
                                <span></span>
                                <span></span>
                            </div>
                    }
                    <div style={{display: isNavOpen ? "block" : "none"}} className={styles.navMenuList}>
                        <NavLink to="/#cakes" onClick={handleNavLinks("cakes")}>Макаронсы</NavLink>
                        <NavLink to="/about" onClick={handleNavLinks("about")}>Про нас</NavLink>
                        <a href="#contact" onClick={handleNavLinks("contact")}>Контакты</a>
                        {/*<div>Войти</div>*/}
                        {/*<button>Регистрация</button>*/}
                    </div>
                    <Link to="/">
                        <div className={styles.logoWrapper}>
                            <img src={logoImage} alt="Sandi Macarons Logo" className={styles.navLogo} />
                            <h1 className={styles.navLogoName}>Sandi Macarons</h1>
                        </div>
                    </Link>
                    <div className={styles.leftLinks}>
                        {/*<div className={styles.login}>Войти</div>*/}
                        {/*<div className={styles.register}>Регистрация</div>*/}
                        <div className={styles.cart}>
                            <i className="fa-solid fa-cart-shopping fa-xl" onClick={handleCartClick}></i>
                            <div className={styles.cartCounter}>{totalQty}</div>
                        </div>
                    </div>
                </section>
            </nav>
        </>
    )
}

export default Navbar