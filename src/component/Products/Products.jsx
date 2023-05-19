import React, { useEffect } from "react";
import { compose } from "redux";
import { getDataProducts } from "../../redux/products-reducer";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import css from "./Products.module.css";
import photo from "./../../image/product.png";
import { NavLink } from "react-router-dom";

let Products = ({ items, isFetching, getDataProducts }) => {

    useEffect(() => { getDataProducts() }, [])

    document.title = "Товары";


    return <>
        {items == null || isFetching ? <div>Загрузка</div> :
            <div className={css.products}>
                {items.map((el) => <NavLink key={el.id} to={'/product/'+el.id}><div className={css.product} >
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
                </NavLink>)}
            </div>}
    </>
}

let mapStateToProps = (state) => ({
    items: state.products.items,
    isFetching: state.products.isFetching
})

export default compose(connect(mapStateToProps, { getDataProducts }), withAuthRedirect)(Products);