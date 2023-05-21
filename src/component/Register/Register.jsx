
import { Button, Checkbox, Form, Input, InputNumber, Typography } from "antd";
import { connect } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { initializeApp } from "../../redux/app-reducer";
import { login, register } from "../../redux/auth-reducer";
import css from "./Register.module.css";

let Register = ({ isAuth, register, error }) => {

  const navigate = useNavigate();

  document.title = "Регистрация"

  const onFinish = (values) => {
    initializeApp()
    if (register({'fio':values.fio, 'num_phone': values.numPhone, 'login': values.login, 'password': values.password}))
    setTimeout(()=> navigate("/login"),1000);
    
  }
  if (isAuth) {
    return <Navigate to="/" replace />
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
        }}
        initialValues={{
          login: "",
          password: "",
          doublePassword: "",
          fio: "",
          numPhone: "",
        }}
      >
        <Typography.Title level={3} >Регистрация</Typography.Title>
        <label >ФИО</label>
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
        <label >Номер телефона</label>
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
          <InputNumber min={11111111111} max={99999999999} maxLength={11} width={500} style={error ? { borderColor: "#ff4d4f", width: 400 } : {width: 400}} />
        </Form.Item>
        <label >Логин</label>
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

        <label >Пароль</label>
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

        <label >Повтор пароля</label>
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

        <Form.Item name="error" style={{ position: "relative", height: 0 }} >
          <div className={css.error} style={error ? { top: -10 } : { top: 0 }}> {error}</div>

        </Form.Item>

        <Form.Item
        >
          <Button className={css.logButton} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  </div>
}

let mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  error: state.auth.error,
});
export default connect(mapStateToProps, { register })(Register);