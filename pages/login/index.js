import { Button, Form, Input } from 'antd'
import { MailOutlined } from '@ant-design/icons'
import { Alert } from 'antd'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { setToken } from '../../store/authSlice'
import { setCookie } from 'cookies-next'
import { useSelector } from 'react-redux'
import axios from 'axios'

export default function Login() {
  const { token } = useSelector((state) => state.auth)
  const router = useRouter()
  useEffect(() => {
    if (token) {
      router.push('/')
    }
  }, [])
  const [err, setErr] = useState(false)
  const dispatch = useDispatch()
  const onFinish = async (values) => {
    const rawResponse = await fetch('/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    const content = await rawResponse.json()
    if (content.error) {
      await setErr(true)
      return
    }
    await setCookie('token', values)
    await dispatch(setToken(values))
    router.push('/')
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <section className="container">
      <Form
        name="auth"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {err && <Alert closable={true} message="User not found" type="error" />}
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input
            placeholder="Enter your email"
            prefix={<MailOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </section>
  )
}
