import { CaretDownOutlined, DownOutlined, LogoutOutlined, UserOutlined, MessageOutlined, SettingOutlined, AlignLeftOutlined, OrderedListOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../../redux/auth-reducer";
import avatar from "./../../../image/product.png"

import css from "./Menu.module.css"
import { useOnClickOutside } from "usehooks-ts";

let Menu = ({ logout, login, rol}) => {

    let [openMenu, setMenu] = useState(false);

    const activeMenu = () => {
        setMenu(!openMenu);
    }

    const deactiveMenu = () => {
        setMenu(false);
    }   
    const ref = useRef();
    useOnClickOutside(ref, deactiveMenu);

    return <div ref={ref} onClick={() =>{activeMenu()}}  className={css.menu}>
        
        <div  style={openMenu ? {backgroundColor: "#0c4a6b"}: {}}  className={css.trigger}>
        <div style={{
            backgroundImage: `url(${avatar})`,
            backgroundSize: "100% 100%",
            height: 50,
            width: 50,
            borderRadius: "50%",
            backgroundPosition: "center"
        }}></div>
        <div className={css.name}>{login}</div>
        <div><CaretDownOutlined /></div>
        </div>
        <div style={openMenu && rol == "admin" ? {height: "calc(35px*4)"}:{}} className={`${css.contextMenu} ${!openMenu && css.closeMenu}`}>
        <NavLink to="/products"><OrderedListOutlined style={{marginLeft: 5, marginRight: 10}} />Товары</NavLink>
        <NavLink to="/order"><PlusOutlined style={{marginLeft: 5, marginRight: 10}} />Заказы</NavLink>
        {rol== "admin" ?<NavLink to="/admin"><SettingOutlined style={{marginLeft: 5, marginRight: 10}}  />Админ</NavLink>: null}
        <Button onClick={()=>{logout()}} type="primary" className={css.button} icon={<LogoutOutlined />}>Выйти</Button>
        </div>
    </div>
}

let mapStateToProps = (state) => {
    return {
        login: state.auth.login,
        rol: state.auth.rol
    }
}

export default connect(mapStateToProps, {logout})(Menu);