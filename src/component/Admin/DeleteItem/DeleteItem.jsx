import { Button, Form, Input, InputNumber, Modal, Select, Typography } from "antd";
import React, { useState } from "react";
import { initializeApp } from "../../../redux/app-reducer";
import css from "./../Admin.module.css"

let DeleteItem = ({ items, deleteProduct }) => {


    const [id, setItemId] = useState('');
    const [itemName, setItemName] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        deleteProduct({id})
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };




    const handleChange = (value) => {
        setItemId(value);
        items.forEach(el => {
            if(el.id == value)
            setItemName(el.name);
        });
        
    }

    const onFinish = (values) => {
        initializeApp();
        showModal();
    }

    return <div  className={css.form}>
        <Form
            name="deleteForm"
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 16,
            }}
            onFinish={onFinish}
        >
            <Typography.Title style={{marginLeft:30, marginBottom:20}}   level={3} >Удаление товара </Typography.Title>

            <Form.Item
                name="id"
                label="ID товара"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, выберите  id товрара!',
                    },
                ]}
            >
                <Select
                placeholder="Выберете ID товара, который хотите удалить"
                    value={id}
                    onChange={handleChange}
                    options={items.map(el => ({
                        value: el.id,
                        label: el.id,
                    }))}

                />
            </Form.Item>
            <Form.Item
                name="name"
                label="Название"
            >
                {itemName || "Выберете ID товара, который хотите удалить"}
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 4,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit" className={css.logButton}>
                    Удалить
                </Button>
            </Form.Item>
        </Form>
        <Modal
        centered
        width={300}
        bodyStyle={{height:10}}
        title={"Вы действительно хотите удалить этот товар?"}
            footer={[
                <Button key="back" onClick={handleCancel}>Нет</Button>,
                <Button key="submit" type="primary" onClick={handleOk}>Да</Button>,
            ]}
            open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        </Modal>
    </div>
}

export default DeleteItem;