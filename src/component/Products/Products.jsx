import React, { useEffect } from "react";
import { compose } from "redux";
import { getDataProducts } from "../../redux/products-reducer";
import { connect } from "react-redux";

let Products = ({items, isFetching, getDataProducts}) => {
    
    useEffect(() => { getDataProducts() }, [])



    return <>
    {items == null || isFetching ? <div>Загрузка</div> :
    items.map((el)=> <div>
        {el.name}
    </div>)}
    </>
}

let mapStateToProps = (state) => ({
    items: state.products.items,
    isFetching: state.products.isFetching
})

export default  compose(connect(mapStateToProps, {getDataProducts}))(Products);