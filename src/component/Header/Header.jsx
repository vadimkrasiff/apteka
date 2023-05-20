import { LoginOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { connect } from "react-redux";
import css from "./Header.module.css"
import {logout} from './../../redux/auth-reducer';
import { NavLink } from "react-router-dom";
import Menu from "./Menu/Menu";
// import { getUserProfile } from "../../redux/profile-reducer";

let Header = ({isAuth, logout, getUserProfile}) => {
    
    return <header>
        <div className={css.content}>
            <a to='/' className={css.logo}><div className={css.icon}></div>АПТЕКА</a>
            { isAuth ?
            <Menu logout={logout}  />
        :<div className={css.buttons}><Button  type="text" className={css.button} >
            <NavLink to={"/login"}>Sign in</NavLink></Button>   
            <Button  type="text" className={css.button} style={{border:"1px solid #fff"}} >
            <NavLink to={"/register"}>Sign up</NavLink></Button>
            </div>}
        </div> 
    </header>
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    
});

export default connect(mapStateToProps, {logout })(Header);
// export default Header;