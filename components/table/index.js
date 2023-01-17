import { Divider, Table, Space, Button } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons'
import { useState, useEffect } from 'react'
import axios from 'axios'
import UserForm from '../userform'
import { useSelector, useDispatch } from 'react-redux'
import { setModalVisible, setUpdate } from '../../store/tableSlice'

const columns = [
  {
    title: 'Name',
    dataIndex: 'username',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Password',
    dataIndex: 'password',
  },
  {
    title: 'Action',
    dataIndex: 'isDeletable',
    render: (text, record) => (
      <Space size={'large'}>
        <EditOutlined
          style={{
            color: '#4096ff',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        />
        <DeleteOutlined
          style={{
            color: '#ff4d4f',
            cursor: record.isDeletable ? 'pointer' : 'not-allowed',
            fontSize: '16px',
            opacity: record.isDeletable ? 1 : 0.5,
          }}
        />
      </Space>
    ),
  },
]

export default function DataTable() {
  const dispatch = useDispatch()
  const [buttonVisible, setButtonVisible] = useState(false)
  const [data, setData] = useState([])
  const { update_id, isModalVisible } = useSelector((state) => state.table)
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/users')
      setData(result.data)
    }
    fetchData()
  }, [update_id])
  const handleDeleteAll = async () => {
    const rawResponse = await fetch(`/api/users`, {
      method: 'DELETE',
    })
    const content = await rawResponse.json()
    if (content.error) {
      console.log('Something went wrong!')
      return
    }
    dispatch(setUpdate(Date.now()))
  }
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRows.length > 0) {
        setButtonVisible(true)
        return
      }
      setButtonVisible(false)
    },
    getCheckboxProps: (record) => ({
      disabled: record.isDeletable === false,
    }),
  }
  return (
    <div>
      <Space size={'large'}>
        <Button
          onClick={() => dispatch(setModalVisible(!isModalVisible))}
          type="primary"
        >
          Add <ArrowRightOutlined />
        </Button>
        {buttonVisible && (
          <Button onClick={() => handleDeleteAll()} type="primary" danger>
            Delete All
          </Button>
        )}
      </Space>
      <Divider />
      {isModalVisible && (
        <>
          <UserForm /> <Divider />
        </>
      )}

      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  )
}
