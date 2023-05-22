import { Form, Tabs } from "antd";
import React, { useEffect } from "react";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { createProduct, getCategories, getDataProducts, updateProduct } from "../../redux/products-reducer";
import { compose } from "redux";
import { connect } from "react-redux";
import Preloader from "../../common/Preloader";
import CreateItem from "./CreateItem/CreateItem";
import UpdateItem from "./UpdateItem/UpdateItem";

let Admin = ({getDataProducts, getCategories, createProduct, updateProduct, items, categories, rol, isFetching}) => {

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
                children: (<UpdateItem categories={categories} items={items}  updateProduct={updateProduct} />),
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

export default compose(connect(mapStateToProps, { getDataProducts, getCategories, createProduct, updateProduct }), withAuthRedirect)(Admin);