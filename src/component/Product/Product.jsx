import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import { getDataProduct } from "../../redux/product-reducer";
import css from "./Product.module.css"
import photo from "./../../image/product.png";
import { Form } from "antd";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import NavBar from "../NavBar/NavBar";
import Preloader from "../../common/Preloader";


let Product = ({ items, error, isFetching, getDataProduct }) => {
    const { currentId } = useParams();
    useEffect(() => {
        getDataProduct(currentId)
    }, [currentId]);

    document.title = items ? items[0].name : "Товар";


    return <>
    <NavBar />
        {!items || isFetching ? <Preloader /> :
            error ? <div>{error}</div> :
                    <div className={css.product}>
                        <div className={css.leftInfo}>
                            <div className={css.photo} style={{
                                backgroundImage: `url(${items[0].image || photo})`,
                                backgroundSize: "100% 100%",
                                width: 300,
                                height: 300,
                                borderRadius: 3
                            }}></div>
                            <div className={css.cost}>Цена: {items[0].cost}₽</div>
                        </div>
                        <div className={css.rightInfo}>
                            <div className={css.name}>{items[0].name}</div>
                            <div >
                                <div>Производитель: {items[0].manufacturer || "Не указан"}</div>
                                <div>Категория: {items[0].category_name}</div>
                            </div>
                            <label className={css.label}>Описание</label>
                            <div className={css.description}>{items[0].description}</div>
                            <label className={css.label}>Наличие в аптеках</label>
                            <div className={css.description}>{
                                items.map(el => (<div key={el.id} className={css.pharmacy}>
                                    <div className={css.address}>{el.address}:  </div>
                                    <div className={css.line}></div>
                                    <div className={css.count}>{el.count ? el.count + "шт." : "Нет в наличии"}</div>
                                </div>))
                            }</div>
                        </div>


                    </div>

        }
    </>
}

let mapStateToProps = (state) => {
    return {
        items: state.product.items,
        error: state.product.error,
        isFetching: state.product.isFetching
    }
}
export default compose(connect(mapStateToProps, { getDataProduct }), withAuthRedirect)(Product);