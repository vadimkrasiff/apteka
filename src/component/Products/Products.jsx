import React, { useEffect } from "react";
import { compose } from "redux";
import { getDataProducts } from "../../redux/products-reducer";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import css from "./Products.module.css";
import photo from "./../../image/product.png"

let Products = ({items, isFetching, getDataProducts}) => {
    
    useEffect(() => { getDataProducts() }, [])



    return <>
    {items == null || isFetching ? <div>Загрузка</div> :
    <div className={css.products}>
        {items.map((el)=> <div className={css.product} key={el.id}>
        <div className={css.photo} style={{
            backgroundImage: `url(${el.image || photo})`,
            backgroundSize: "100% 100%",
            width:180,
            height: 180,
            borderRadius: 3
        }}></div>
        <div className={css.info}>
        <div>{el.name}</div>
        <div className={css.cost}>Цена: {el.cost}₽</div>
        </div>
        
    </div>)}
    </div> }
    </>
}

let mapStateToProps = (state) => ({
    items: state.products.items,
    isFetching: state.products.isFetching
})

export default  compose(connect(mapStateToProps, {getDataProducts}), withAuthRedirect)(Products);