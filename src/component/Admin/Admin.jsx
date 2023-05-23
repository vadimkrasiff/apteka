import { Form, Tabs } from "antd";
import React, { useEffect } from "react";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { createProduct, deleteProduct, getCategories, getDataProducts, getPharmacies, updateProduct } from "../../redux/products-reducer";
import { compose } from "redux";
import { connect } from "react-redux";
import Preloader from "../../common/Preloader";
import CreateItem from "./CreateItem/CreateItem";
import UpdateItem from "./UpdateItem/UpdateItem";
import DeleteItem from "./DeleteItem/DeleteItem";
import { register } from "../../redux/auth-reducer";
import Register from "./Register/Register";
import Worker from "./Worker/Worker";
import { getDataWorkers } from "../../redux/workers-reducer";

let Admin = ({getDataProducts, getCategories, getPharmacies, createProduct, updateProduct, deleteProduct, register, getDataWorkers, pharmacies, error, items, workers, categories, rol, isFetching}) => {

    useEffect(() => { getDataProducts(); getCategories(); getPharmacies(); getDataWorkers(); }, [])

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
            {
                label: "Создание сотрудника",
                key: 4,
                children: (<Register error={error}  pharmacies={pharmacies} register={register}  />),
            },
            {
                label: "Сотрудники",
                key: 5,
                children: (<Worker workers={workers} />),
            },
            {
                label: "Заказы",
                key: 6,
                children: (<Worker workers={workers} />),
            },
        ]}
        />

        }
    </>
}

let mapStateToProps = (state) => ({
    workers: state.workers.workers,
    rol: state.auth.rol,
    items: state.products.items,
    categories: state.products.categories,
    pharmacies: state.products.pharmacies,
    isFetching: state.products.isFetching,
    error: state.auth.error,
})

export default compose(connect(mapStateToProps, { getDataProducts, getCategories, getPharmacies, createProduct, updateProduct, deleteProduct, register, getDataWorkers }), withAuthRedirect)(Admin);