import logo from '../../assets/logo.png'
import styles from './index.module.less'
import { Button, Input, Form } from 'react-vant'
import { Toast } from 'antd-mobile' // 导入 antd-mobile 的 Toast
import axios from '../../api/axios'
import { useNavigate, useLocation } from 'react-router'

export default function Login() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [form] = Form.useForm()
  if (state) {
    form.setFieldsValue(state)
  }

  const onFinish = values => {
    // 发登录请求
    axios.post('/user/login', values).then(res => {
      // axios拦截器已经处理了code !== '1'的情况
      // 能到这里说明登录成功了，res就是response.data
      localStorage.setItem('userInfo', JSON.stringify(res.data))
      localStorage.setItem('accessToken', res.accessToken)
      localStorage.setItem('refreshToken', res.refreshToken)
      Toast.show({
        icon: 'success',
        content: '登录成功'
      })
      // 登录成功后跳转
      setTimeout(() => {
        navigate('/noteClass')
      }, 1500)
    }).catch(err => {
      // 错误处理已经在 axios 拦截器中处理了
      // 这里只需要记录日志即可
      console.log('登录失败:', err.message || err)
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
      <p className={styles['login-tips']} onClick={() => {
        navigate('/register')
      }}>
        没有账号?点这里注册
      </p>
    </div>
  )
}
