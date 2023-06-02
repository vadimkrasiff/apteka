import { Button, Form, Input, InputNumber, Select, Typography } from "antd";
import React, { useState } from "react";
import { initializeApp } from "../../../redux/app-reducer";
import css from "./../Admin.module.css"

let UpdateItem = ({ categories, items, updateProduct }) => {

    const [form] = Form.useForm();
    const [itemId, setItemId] = useState(items[0].id);

    const handleChange = (value) => {
        setItemId(value);
        form.setFieldsValue(items.map(el => {
            if (el.id == value) {
                return {
                    id: el.id,
                    name: el.name,
                    cost: el.cost,
                    description: el.description,
                    manufacturer: el.manufacturer,
                    category_id: el.category_id
                }
            }
        }).filter((el, i) => !!el?.name)[0]);


    }

    const onFinish = (values) => {
        initializeApp()
        updateProduct(values);
        console.log(values)
    }

    return <div className={css.form}>
        <Form form={form}
            name="updateForm"
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 16,
            }}
            onFinish={onFinish}
        >
            <Typography.Title style={{marginLeft:30, marginBottom:20}}  level={3} >Изменение товара </Typography.Title>

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
                placeholder="Выберете ID товара, у которого хотите изменить данные"
                    value={itemId}
                    onChange={handleChange}
                    options={items.map(el => ({
                        value: el.id,
                        label: (el.id + " - " + el.name),
                    }))}

                />
            </Form.Item>
            <Form.Item
                name="name"
                label="Название"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, введите  название!',
                    },
                ]}

            >
                <Input  />
            </Form.Item>
            <Form.Item
                name="cost"
                label="Цена"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, введите  цену!',
                    },
                ]}
            >
                <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
                name="description"
                label="Описание"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, введите  описание!',
                    },
                ]}
            >
                <Input.TextArea autoSize={{
                    minRows: 6,
                    maxRows: 9,
                }} />
            </Form.Item>

            <Form.Item
                name="manufacturer"
                label="Производитель"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, введите  производитель!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="category_id"
                label="Категория"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста, выберите  категорию!',
                    },
                ]}
            >
                <Select
                    options={categories.map(el => ({
                        value: el.id,
                        label: el.name,
                    }))}

                />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 4,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit" className={css.logButton}>
                    Изменить
                </Button>
            </Form.Item>
        </Form>
    </div>
}

export default UpdateItem;