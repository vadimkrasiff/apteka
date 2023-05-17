import React from "react";
import { NavLink } from "react-router-dom";
import css from './NavBar.module.css';

let NavBar = () => {
    return <div className={css.navbar}>
    <NavLink to="/create-product" className={css.nav}><span> Создать пользователя</span></NavLink>
    <NavLink to="/products" className={css.nav}><span>Товары</span></NavLink>
    <NavLink to="/" className={css.nav}><span className={css.last}>Главная</span> </NavLink>
</div>
}

export default NavBar;