import { Form, Modal, Table, Typography } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import css from "./Detailed.module.css"

let Detailed = ({ openModal, setOpenModal, currentSub, currentOrder }) => {

    const columns = [
        {
            title: 'Название',
            dataIndex: 'item_name',
            sorter: (a, b) => {
                const textA = a.item_name.props.children;
                const textB = b.item_name.props.children;
                return textA.localeCompare(textB);
            }
        },
        {
            title: 'Цена',
            dataIndex: 'cost',
            sorter: (a, b) => a.cost - b.cost,
        },
        {
            title: 'Количество',
            dataIndex: 'count',
            sorter: (a, b) => a.count - b.count,
        },
        {
            title: 'Сумма',
            dataIndex: 'sum',
            sorter: (a, b) => a.sum - b.sum,
        },
    ];

    const data = currentSub.map((el, i) => ({
        key: i + 1,
        item_name: (<NavLink to={"/product/" + el.item_id}>{el.item_name}</NavLink>),
        cost: el.cost,
        count: el.count,
        sum: el.sum
    }))

    const handleCancel = () => {
        // setInputValues([]);
        setOpenModal(false);
    };

    const handleOk = () => {
        // console.log(data);
        // setNull();
        // setInputValues([]);
        setOpenModal(false);
    };

    return <>
        <Modal width={700} style={{ width: 800 }} open={openModal} onOk={handleOk} onCancel={handleCancel}>
            <Typography.Title level={3} style={{ marginBottom: 20 }}>Детали заказа</Typography.Title>
                <label className={css.label}>Номер товра</label>
                <div className={css.path}>
                {currentOrder.id}
                </div>
                <label className={css.label}>Сотрудник</label>
                <div className={css.path}>
                {currentOrder.fio}
                </div>
                <label className={css.label}>Дата</label>
                <div className={css.path}>
                {currentOrder.date}
                </div>
                <label className={css.label}>Сумма</label>
                <div className={css.path}>
                {currentOrder.sum}
                </div>
                <label className={css.label} style={{top:10}}>Товары</label>
                
                <Table   pagination={false} columns={columns}
                    dataSource={data} />
                
        </Modal>
    </>
}

export default Detailed;