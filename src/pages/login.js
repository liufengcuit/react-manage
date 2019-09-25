import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import "./login.scss";

class Login extends React.Component  {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.history.push("/dashboard");
            }else{
                console.log(this.props)
                return false;
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout ={
                    labelCol: { span: 5 },
                    wrapperCol: { span: 19 },
                }
    return (
        <div className="login-background">
            <div className="login-form-box">
                <h3>后台管理系统</h3>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item label="用户名" {...formItemLayout}>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item label="密码" {...formItemLayout}>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item className="textAlignCenter">
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
    }
}


const LoginForm = Form.create({ name: 'login' })(Login);

export default LoginForm;