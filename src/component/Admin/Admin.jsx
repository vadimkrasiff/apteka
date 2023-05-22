import { Form, Tabs } from "antd";
import React, { useEffect } from "react";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { createProduct, deleteProduct, getCategories, getDataProducts, updateProduct } from "../../redux/products-reducer";
import { compose } from "redux";
import { connect } from "react-redux";
import Preloader from "../../common/Preloader";
import CreateItem from "./CreateItem/CreateItem";
import UpdateItem from "./UpdateItem/UpdateItem";
import DeleteItem from "./DeleteItem/DeleteItem";

let Admin = ({getDataProducts, getCategories, createProduct, updateProduct, deleteProduct, items, categories, rol, isFetching}) => {

    useEffect(() => { getDataProducts(); getCategories()}, [])

    document.title = "Админ панель";
    

    return <>
    {!items || !categories || isFetching ? <Preloader /> :
    rol !== 'admin' ? <div style={{width:"100%"}}><div>У Вас нет доступа!</div><><Preloader /></></div> :    
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
                children: (<DeleteItem items={items}  deleteProduct={deleteProduct}  />),
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

export default compose(connect(mapStateToProps, { getDataProducts, getCategories, createProduct, updateProduct, deleteProduct }), withAuthRedirect)(Admin);