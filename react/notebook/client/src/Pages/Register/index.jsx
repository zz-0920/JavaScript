import logo from '../../assets/logo.png'
import styles from './index.module.less'
import { Button, Input, Form } from 'react-vant'
import { Toast } from 'antd-mobile'
import axios from '../../api/axios'
import { useNavigate } from 'react-router'

export default function Register() {
    const navigate = useNavigate()
    const [form] = Form.useForm()

    const onFinish = values => {
        // 发注册请求
        axios.post('/user/register', values).then(
            res => {
                // ✅ 修改：直接判断成功，因为拦截器已经处理了错误情况
                Toast.show({
                    icon: 'success',
                    content: '注册成功',
                    duration: 1000
                })
                setTimeout(() => {
                    navigate('/login', {
                        state: {
                            username: values.username,
                            password: values.password
                        }
                    })
                }, 1000)
            }
        ).catch(err => {
            // 错误处理（axios拦截器已经显示了Toast，这里可以省略或添加额外处理）
            console.error('注册失败:', err)
        })
    }

    return (
        <div className={styles.login}>
            <h1 className={styles.title}>注册</h1>
            <div className={styles['login-wrapper']}>
                <div className={styles.avatar}>
                    <img width={100} src={logo} alt="" />
                </div>
                <Form
                    form={form}
                    onFinish={onFinish}
                    footer={
                        <div style={{ margin: '16px 16px 0' }}>
                            <Button round nativeType='submit' type='primary' block color='green'>
                                注册
                            </Button>
                        </div>
                    }
                >
                    <Form.Item
                        rules={[{ required: true, message: '请填写用户名' }]}
                        name='username'
                        label='用户名'
                        labelWidth={50}
                    >
                        <Input placeholder='请输入用户名' />
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true, message: '请填写密码' }]}
                        name='password'
                        label='密码'
                        labelWidth={50}
                    >
                        <Input placeholder='请输入密码' />
                    </Form.Item>
                    <Form.Item
                        rules={[{ required: true, message: '请填写昵称' }]}
                        name='nickname'  // ✅ 修改为 nickname
                        label='昵称'
                        labelWidth={50}
                    >
                        <Input placeholder='请输入昵称' />
                    </Form.Item>
                </Form>
            </div>
            <p className={styles['login-tips']} onClick={() => {
                navigate('/login')
            }}>
                已有帐号，点击去登录
            </p>
        </div>
    )
}
