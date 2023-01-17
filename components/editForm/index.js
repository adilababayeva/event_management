import { Button, Form, Input } from 'antd'
import { UserOutlined, MailOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { setUpdate, setEditVisible } from '../../store/tableSlice'
import { useState } from 'react'

const CustomizedForm = ({ onChange, fields, onFinish }) => (
  <Form
    name="editUser"
    layout="inline"
    fields={fields}
    onFieldsChange={(_, allFields) => {
      onChange(allFields)
    }}
    onFinish={onFinish}
  >
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
        Edit User
      </Button>
    </Form.Item>
  </Form>
)
export default function EditForm() {
  const { user } = useSelector((state) => state.table)
  const [fields, setFields] = useState([
    {
      name: 'username',
      value: user.username,
    },
    {
      name: 'password',
      value: user.password,
    },
    {
      name: 'email',
      value: user.email,
    },
  ])
  const dispatch = useDispatch()
  const onFinish = async () => {
    const values = fields.reduce((acc, field) => {
      acc[field.name] = field.value
      return acc
    }, {})
    console.log(values)
    const rawResponse = await fetch(`/api/users/${user._id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    const content = await rawResponse.json()
    if (content.error) {
      return
    }
    await dispatch(setUpdate(Date.now()))
    await dispatch(setEditVisible(false))
  }

  return (
    <CustomizedForm
      fields={fields}
      onChange={(newFields) => {
        setFields(newFields)
      }}
      onFinish={onFinish}
    />
  )
}
