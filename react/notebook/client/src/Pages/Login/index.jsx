import logo from '../../assets/logo.png'
import styles from './index.module.less'
import { Button, Input, Form } from 'react-vant'
import axios from '../../api/axios'

export default function Login() {
  const [form] = Form.useForm()

  const onFinish = values => {
    // 发登录请求
    axios.post('/user/login', values).then(res => {
      console.log(res)
    })
  }

  return (
    <div className={styles.login}>
      <h1 className={styles.title}>登录</h1>
      <div className={styles['login-wrapper']}>
        <div className={styles.avatar}>
          <img width={100} src={logo} alt="" />
        </div>
        <Form
          form={form}
          onFinish={onFinish}
          footer={
            <div style={{ margin: '16px 16px 0' }}>
              <Button round nativeType='submit' type='primary' block>
                登录
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
        </Form>
      </div>
      <p className={styles['login-tips']}>
        没有账号?点这里注册
      </p>
    </div>
  )
}
