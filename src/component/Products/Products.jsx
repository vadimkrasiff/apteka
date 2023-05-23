import React, { useEffect, useState } from "react";
import { compose } from "redux";
import { getDataProducts } from "../../redux/products-reducer";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import css from "./Products.module.css";
import photo from "./../../image/product.png";
import { NavLink } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import NavBar from "../NavBar/NavBar";
import Preloader from "../../common/Preloader";

let Products = ({ items, isFetching, getDataProducts }) => {

    useEffect(() => { getDataProducts() }, [])

    document.title = "Товары";

    const [searchText, setSearchText] = useState('');

    const filteredItems = items ? items.filter(item => {
        return (
            item.name.toLowerCase().includes(searchText.toLowerCase())
        )
    }) : null;

    const handleChange = e => {
        setSearchText(e.target.value);
    };

    const onFinish = (values) => {
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return <>
        {items == null || isFetching ? <><Preloader /></> :
            <div className={css.products}>
                <div className={css.search}>
                    <Form
                        name="basic"
                    >
                        <Form.Item
                            name="search" >
                            <Input onChange={handleChange} placeholder="Поиск..." style={{ width: 900, height: 40, position: "relative" }} />
                        </Form.Item>
                    </Form>
                </div>
                {filteredItems.length != 0 ? filteredItems.map((el) => <NavLink key={el.id} className={css.product} to={'/product/' + el.id}><div >
                    <div className={css.photo} style={{
                        backgroundImage: `url(${el.image || photo})`,
                        backgroundSize: "100% 100%",
                        width: 200,
                        height: 200,
                        borderRadius: 3
                    }}></div>
                    <div className={css.info}>
                        <div>{el.name}</div>
                        <div className={css.cost}>
                            Цена: {el.cost}₽</div>
                    </div>
                </div>
                </NavLink>): <><div>Товары не найдены</div><div className="preloader"><Preloader /></div></> }
            </div>}
    </>
}

let mapStateToProps = (state) => ({
    items: state.products.items,
    isFetching: state.products.isFetching
})

export default compose(connect(mapStateToProps, { getDataProducts }))(Products);