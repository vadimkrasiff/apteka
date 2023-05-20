
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { initializeApp } from "../../redux/app-reducer";
import { login } from "../../redux/auth-reducer";
import css from "./Register.module.css";

let Login = ({ isAuth, login, error }) => {

  document.title= "Авторизация"

    const onFinish = (values) => {
        initializeApp()
        login(values.login, values.password)
    }
    if (isAuth) {
        return <Navigate to="/" replace />
    }

    return <div className={css.form}>
        <div className={css.formik}>
        <Form 
            onFinish={onFinish}
            initialValues={{
              login: "",
                password: "",
                remember: true,
            }}
        >
            <Typography.Title level={3} >Authorization</Typography.Title>
            <Form.Item
      name="login"
      
      rules={[
        {
          required: true,
          message: 'Пожалуйста, введите  email!',
        },
      ]}
    >
      <Input style={error ?{borderColor:"#ff4d4f"}:{}} />
    </Form.Item>

    <Form.Item
      name="password"
      rules={[
        {
          required: true,
          message: 'Пожалуйста, введите парроль!',
        },
      ]}
    >
      <Input.Password style={error ?{borderColor:"#ff4d4f"}:{}} />
    </Form.Item>

    <Form.Item name="error" style={{position:"relative"}} >
      <div className={css.error} style={error ? { top:0} : { top: -10}}> {error}</div>
      
    </Form.Item>

    <Form.Item
    >
      <Button className={css.logButton} type="primary" htmlType="submit">
        Sign in
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

export default connect(mapStateToProps, { login })(Login);