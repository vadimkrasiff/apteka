import React, { useEffect } from "react";
import css from "./../Admin.module.css"
import { Table, Typography } from "antd";
import { getDataWorkers } from "../../../redux/workers-reducer";
import { connect } from "react-redux";
import { compose } from "redux";

let Orders = ({ orders }) => {

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
    </div>
}


export default Orders;