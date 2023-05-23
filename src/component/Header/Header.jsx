import { LoginOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { connect } from "react-redux";
import css from "./Header.module.css"
import { logout } from './../../redux/auth-reducer';
import { NavLink } from "react-router-dom";
import Menu from "./Menu/Menu";
// import { getUserProfile } from "../../redux/profile-reducer";

let Header = ({ isAuth, logout, rol }) => {

    return <header>
        <div className={css.content}>
            <NavLink to='/products' className={css.logo}><div className={css.icon}></div>АПТЕКА</NavLink>
            <div className={css.menu}>
                <NavLink to="/">Главная</NavLink>
                <NavLink to="/products">Товары</NavLink>
                {isAuth ? <NavLink to="/order">Заказ</NavLink> : null}
                {rol == "admin" ? <NavLink to="/admin">Админ панель</NavLink> : null}
                <NavLink to="/about-me">О нас</NavLink>
            </div>
            {isAuth ?
                <Menu logout={logout} />
                : <div className={css.buttons}><Button type="text" className={css.button} >
                    <NavLink to={"/login"}>Sign in</NavLink></Button>
                    <Button type="text" className={css.button} style={{ border: "1px solid #fff" }} >
                        <NavLink to={"/register"}>Sign up</NavLink></Button>
                </div>}
        </div>
    </header>
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    rol: state.auth.rol

});

export default connect(mapStateToProps, { logout })(Header);
// export default Header;