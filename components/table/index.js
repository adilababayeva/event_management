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
import { setModalVisible } from '../../store/tableSlice'

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
  const [data, setData] = useState([])
  const { update_id, isModalVisible } = useSelector((state) => state.table)
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/users')
      setData(result.data)
    }
    fetchData()
  }, [update_id])
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log('selectedRows: ', selectedRows)
    },
    getCheckboxProps: (record) => ({
      disabled: record.isDeletable === false,
      email: record.email,
    }),
  }
  return (
    <div>
      <Button
        onClick={() => dispatch(setModalVisible(!isModalVisible))}
        type="primary"
      >
        Add <ArrowRightOutlined />
      </Button>
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
