import { Button, Form, Input, InputNumber, Select, Typography } from "antd";
import React from "react";
import { initializeApp } from "../../../redux/app-reducer";
import css from "./../Admin.module.css"

const { TextArea } = Input;

let CreateItem = ({categories, createProduct}) => {

    const onFinish = (values) => {
        initializeApp()
        createProduct({name: values.name, cost: values.cost, description: values.description,
            category_id:values.category_id, manufacturer:values.manufacturer})
      }

    return <div className={css.form} >
        <Form
            name="basic"
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 16,
            }}
            onFinish={onFinish}
            initialValues={{
                name: "",
                cost: "",
                description: "",
                manufacturer: "",
                category_id:"",
            }}
        >
            <Typography.Title style={{marginLeft:30, marginBottom:20}}  level={3} >Создание товара </Typography.Title>
            
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
                <Input />
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
                <InputNumber min={0} style={{ width: "100%"}} />
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
                <TextArea autoSize={{
          minRows: 4,
          maxRows: 6,
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
                options={categories.map(el=>({
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
                <Button type="primary" htmlType="submit" className={css.logButton }>
                    Создать
                </Button>
            </Form.Item>
        </Form>
    </div>
}

export default CreateItem;