import { Avatar, Card } from 'antd';
import logo from '../../assets/logo.png'
import './Login.css'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { useNavigate } from "react-router-dom";


function Login() {
    const navigate = useNavigate();
    const onFinish = values => {
        console.log('Received values of form: ', values);
        navigate('/layout');
    };

    return (
        <div className="login">
            <Card className='login-container'>
                <img className='login-logo' src={logo} alt="" />
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入账号!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="账号" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}
                    >
                        <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
                    </Form.Item>
                    <Form.Item>
                        <Flex justify="space-between" align="center">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>记住密码</Checkbox>
                            </Form.Item>
                            <a href="">忘记密码</a>
                        </Flex>
                    </Form.Item>
                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            登录
                        </Button>
                        or <a href="">注册!</a>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login;