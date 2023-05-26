import React, { useEffect } from "react";
import css from "./../Admin.module.css"
import { Button, Table, Typography } from "antd";
import { getDataWorkers } from "../../../redux/workers-reducer";
import { connect } from "react-redux";
import { compose } from "redux";
import { useState } from "react";
import Detailed from "./Detailed";

let Orders = ({ orders, getOrder, subOrder }) => {

    const [currentSub, setCurrentSub] = useState([]);
    const [currentOrder, setCurrentOrder] = useState({});

    const [openModal, setOpenModal] = useState(false);
    const showModal  = (record) => {
        setCurrentOrder(record);
        setCurrentSub(subOrder.filter((el) => el.order_id == record.id))
        setOpenModal(true);
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Сумма',
            dataIndex: 'sum',
            sorter: (a, b) => a.sum - b.sum,
        },
        {
            title: 'Сотрудник',
            dataIndex: 'fio',
            sorter: (a, b) => a.fio.localeCompare(b.fio)
        },
        {
            title: 'Адрес',
            dataIndex: 'address',
            sorter: (a, b) => a.address.localeCompare(b.address)
        },
        {
            title: 'Дата',
            dataIndex: 'date',
            sorter: (a, b) => a.date.localeCompare(b.date)
        },
        {
            // title: '',
            // dataIndex: 'paths',
            render: (text, record) => (<Button onClick={() =>showModal(record)} type='primary'>Подробнее</Button>)
        },
    ];
      const data= orders.map((el, i )=> ({
        key: i+1,
          id: el.id,
          sum: el.sum,
          fio: el.fio,
          date: el.date_create,
          address: el.address,
      }))



    return <div className={css.form} style={{ width: 1000 }}>
        <Typography.Title level={3} style={{ marginBottom: 20 }}>Заказы</Typography.Title>
        <Table columns={columns}
         dataSource={data}
        />
        <Detailed openModal={openModal} setOpenModal={setOpenModal} currentOrder={currentOrder} currentSub={currentSub} />
    </div>
}


export default Orders;