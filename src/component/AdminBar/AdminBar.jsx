import React from "react";
import { NavLink } from "react-router-dom";
import css from './AdminBar.module.css';

let AdminBar = () => {
    return <div className={css.navbar}>
    <NavLink to="/create-item" className={css.nav}><span> Добавление продукта</span></NavLink>
    <NavLink to="/update-item" className={css.nav}><span>Изменить товар</span></NavLink>
    <NavLink to="/admin" className={css.nav}><span className={css.last}>Главная</span> </NavLink>
</div>
}

export default AdminBar;