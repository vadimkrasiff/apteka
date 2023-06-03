import React, { useEffect, useState } from "react";
import { compose } from "redux";
import { getDataProducts } from "../../redux/products-reducer";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import css from "./Products.module.css";
import photo from "./../../image/product.png";
import { NavLink } from "react-router-dom";
import { Button, Form, Input, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import NavBar from "../NavBar/NavBar";
import Preloader from "../../common/Preloader";
import { getCategories } from "../../redux/products-reducer";

let Products = ({ items, isFetching, getDataProducts, getCategories, categories }) => {

    useEffect(() => { getDataProducts(); getCategories(); }, [])

    document.title = "Товары";

    const [searchText, setSearchText] = useState('');

    const filteredItems = items ? items.filter(item => {
        return (
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.category_name.toLowerCase().includes(searchText.toLowerCase())
        )
    }) : null;

    const handleChange = e => {
        setSearchText(e.target.value);
        form.setFieldsValue({search:e.target.value})
    };

    const onFinish = (values) => {
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const getCategoryProduct = (category) => {
        return <>
        { filteredItems.map((el) =>{if(el.category_name == category) return(<NavLink key={el.id} className={css.product} to={'/product/' + el.id}><div >
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
                </NavLink>)})}
        </>
    }
    const [form] = Form.useForm();
    return <>
        {items == null || isFetching ? <><Preloader /></> :
            <div className={css.products}>
                <div className={css.search}>
                    <Form
                    form={form}
                        name="basic"
                        ini
                    >
                        <Form.Item
                            name="search" >
                            <Input allowClear  onChange={handleChange} value={searchText} placeholder="Введите название товара или категории" style={{ width: 900, height: 40, zIndex:0}} />
                        </Form.Item>
                    </Form>
                </div>
                {filteredItems.length != 0 ? !categories ? <div className="preloader"><Preloader /></div>:
                categories.filter(el => filteredItems.filter(f=> f.category_name == el.name).length != 0).map((el) => <> 
                <Typography.Title onClick={()=>handleChange( {target: {value: el.name}})} style={{cursor: "pointer", marginLeft:20, marginBottom:20}}  level={3} >{el.name} </Typography.Title>
                <div className={css.products}>
                {getCategoryProduct(el.name)}
                </div> 
                </>): <><div>Товары не найдены</div><div className="preloader"><Preloader /></div></> }
                

            </div>}
    </>
}

let mapStateToProps = (state) => ({
    items: state.products.items,
    isFetching: state.products.isFetching,
    categories: state.products.categories,
})

export default compose(connect(mapStateToProps, { getDataProducts, getCategories }))(Products);