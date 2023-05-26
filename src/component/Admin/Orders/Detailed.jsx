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
            <Form
                labelCol={{ span: 3, }}

                wrapperCol={{ span: 16 }}
            >
                <Form.Item style={{ width: '800px' }} 
                    label={<span style={{ fontWeight: 500 }}>Номер товра</span>}>
                    {/* <div className={css.path}> */}
                    {/* <div className={css.label}>Номер товра: </div> */}
                    {/* <span className={css.line}></span> */}
                    {currentOrder.id}
                    {/* </div> */}
                </Form.Item>
                <Form.Item style={{ width: '800px' }} 
                    label={<span style={{ fontWeight: 500 }}>Сотрудник</span>}>
                    {/* <div className={css.path}>
                {/* <div className={css.label}>Сотрудник: </div> */}
                    {/* <div className={css.line}></div> */}
                    <div className={css.item}>{currentOrder.fio}</div>
                    {/* </div> */}
                </Form.Item>
                <Form.Item style={{ width: '800px' }} 
                    label={<span style={{ fontWeight: 500 }}>Дата</span>}
                >
                    {/* <div className={css.path}> */}
                    {/* <div className={css.label}>Дата: </div> */}
                    {/* <div className={css.line}></div> */}
                    <div className={css.item}>{currentOrder.date}</div>
                    {/* </div> */}
                </Form.Item>
                <Form.Item style={{ width: '800px' }} 
                    label={<span style={{ fontWeight: 500 }}>Сумма</span>}
                >
                    {/* <div className={css.path}>
                <div className={css.line}></div> */}
                    <div className={css.item}>{currentOrder.sum}</div>
                    {/* </div> */}
                </Form.Item>
                <Form.Item style={{ width: '800px' }} label={<span style={{ fontWeight: 500 }}>Товары</span>}> 
                <Table  pagination={false} columns={columns}
                    dataSource={data} />
                </Form.Item>
                
                


            </Form>





        </Modal>
    </>
}

export default Detailed;