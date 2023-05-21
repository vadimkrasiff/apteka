import { Form, Tabs } from "antd";
import React, { useEffect } from "react";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { createProduct, getCategories, getDataProducts } from "../../redux/products-reducer";
import { compose } from "redux";
import { connect } from "react-redux";
import Preloader from "../../common/Preloader";
import CreateItem from "./CreateItem/CreateItem";


let Admin = ({getDataProducts, getCategories, createProduct, items, categories, rol, isFetching}) => {

    useEffect(() => { getDataProducts(); getCategories()}, [])

    document.title = "Админ панель";
    

    return <>
    {!items || !categories || isFetching ? <Preloader /> :
    rol !== 'admin' ? <>У Вас нет доступа!<Preloader /></> :    
        <Tabs
        defaultActiveKey="1"
        tabPosition="left"
        items={[
            {
                label: "Создание товара",
                key: 1,
                children: (<CreateItem categories={categories} createProduct={createProduct} />),
            },
            {
                label: "Изменение товара",
                key: 2,
                children: `Tab 2`,
            },
            {
                label: "Удаление товара",
                key: 3,
                children: `Tab 3`,
            },
        ]}
        />

        }
    </>
}

let mapStateToProps = (state) => ({
    rol: state.auth.rol,
    items: state.products.items,
    categories: state.products.categories,
    isFetching: state.products.isFetching
})

export default compose(connect(mapStateToProps, { getDataProducts, getCategories, createProduct }), withAuthRedirect)(Admin);