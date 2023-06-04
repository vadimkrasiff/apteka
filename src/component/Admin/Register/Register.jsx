
import { Button, Form, Input, InputNumber, Select, Typography } from "antd";
import { connect } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { initializeApp } from "../../../redux/app-reducer";
import {  register } from "../../../redux/auth-reducer";
import css from "./Register.module.css";

let Register = ({ register, error, pharmacies }) => {

  // const navigate = useNavigate();



  const onFinish = (values) => {
    initializeApp()
    register({'fio':values.fio, 'num_phone': values.numPhone, 'login': values.login, 'password': values.password, "pharmacy_id":values.pharmacy_id})
    
  }

  return <div className={css.form}>
    <div className={css.formik}>
      <Form
        onFinish={onFinish}
        defaultValue={{
          login: "",
          password: "",
          doublePassword: "",
          fio: "",
          numPhone: "",
          pharmacy_id:""
        }}
        initialValues={{
          login: "",
          password: "",
          doublePassword: "",
          fio: "",
          numPhone: "",
          pharmacy_id:''
        }}
      >
        <Typography.Title level={3} >Создание сотрудника</Typography.Title>
        <label className={css.label}>ФИО</label>
        <Form.Item
          name="fio"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите  ФИО!',
            },
          ]}
        >
          <Input style={error ? { borderColor: "#ff4d4f" } : {}} />
        </Form.Item>
        <label className={css.label}>Адрес аптеки</label>
        <Form.Item
          name="pharmacy_id"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Пожалуйста, выбирете адрес атеки',
            },
          ]}
        >
          <Select
                    options={pharmacies.map(el => ({
                        value: el.id,
                        label: el.address,
                    }))} />
        </Form.Item>
        <label className={css.label}>Номер телефона</label>
        <Form.Item
          name="numPhone"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите  номер телефона!',
            },
            
          ]}
        >
          <InputNumber min={89111111111} max={89999999999} maxLength={11} width={500} style={error ? { borderColor: "#ff4d4f", width: 400 } : {width: 400}} />
        </Form.Item>
        <label className={css.label}>Логин</label>
        <Form.Item
          name="login"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите логин!',
            },
          ]}
        >
          <Input style={error ? { borderColor: "#ff4d4f" } : {}} />
        </Form.Item>

        <label className={css.label}>Пароль</label>
        <Form.Item
          name="password"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите парроль!',
            },
          ]}
        >
          <Input.Password style={error ? { borderColor: "#ff4d4f" } : {}} />
        </Form.Item>

        <label className={css.label}>Повтор пароля</label>
        <Form.Item
          name="doublePassword"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите парроль еще раз!',
            }, 
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Два введенных вами пароля не совпадают!'));
              },
            }),
          ]}
        >
          <Input.Password style={error ? { borderColor: "#ff4d4f" } : {}} />
        </Form.Item>

        <Form.Item name="error" style={{ position: "relative", height: 0, paddingBottom: 50}} >
          <div className={css.error} style={error ? { top: -10, } : { top: 0 }}>{error}</div>

        </Form.Item>
        <Form.Item
        >
          <Button className={css.logButton} type="primary" htmlType="submit">
            Создать
          </Button>
        </Form.Item>
      </Form>
    </div>
  </div>
}

export default Register;