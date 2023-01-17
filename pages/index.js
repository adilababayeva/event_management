import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  CalendarOutlined,
} from '@ant-design/icons'
import { Layout, Menu, theme } from 'antd'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { setToken } from '../store/authSlice'
import { deleteCookie } from 'cookies-next'
import DataTable from '../components/table'
import Calendar from '../components/calendar'
const { Header, Sider, Content } = Layout

export default function Home() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const { token } = useSelector((state) => state.auth)
  const [tab, setTab] = useState('user')
  useEffect(() => {
    if (!token) {
      router.push('/login')
    }
  }, [])
  const HandleLogout = async () => {
    await deleteCookie('token')
    await dispatch(setToken(null))
    router.push('/login')
  }
  return (
    <>
      <Head>
        <title>Event Management</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout className={styles.container}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: 'Users',
                onClick: () => setTab('user'),
              },
              {
                key: '2',
                icon: <CalendarOutlined />,
                label: 'Events',
                onClick: () => setTab('event'),
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            style={{
              background: colorBgContainer,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              },
            )}
            <Button onClick={() => HandleLogout()} type="primary">
              Logout
            </Button>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {tab === 'user' ? <DataTable /> : <Calendar />}
          </Content>
        </Layout>
      </Layout>
    </>
  )
}
