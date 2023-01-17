import { Button, Form, Input } from 'antd'
import { UserOutlined, MailOutlined } from '@ant-design/icons'
import { Alert } from 'antd'
import { useDispatch } from 'react-redux'
import { setUpdate, setModalVisible } from '../../store/tableSlice'
import { useState } from 'react'

export default function UserForm() {
  const [err, setErr] = useState(false)
  const dispatch = useDispatch()
  const onFinish = async (values) => {
    const rawResponse = await fetch('/api/users', {
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
    await dispatch(setUpdate(Date.now()))
    await dispatch(setModalVisible(false))
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      name="auth"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {err && (
        <Alert closable={true} message="Something went wrong!" type="error" />
      )}
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}
      >
        <Input
          placeholder="Enter your name"
          prefix={<UserOutlined className="site-form-item-icon" />}
        />
      </Form.Item>
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
          Add User
        </Button>
      </Form.Item>
    </Form>
  )
}
