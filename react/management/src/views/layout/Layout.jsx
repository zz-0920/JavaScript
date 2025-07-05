import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import './Layout.css'; // 导入CSS文件

function MainLayout() {
    const { Header, Sider, Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    
    return (
        <Layout className="layout-container"> {/* 添加className */}
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: <Link to="/layout">首页</Link>,
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: <Link to="/layout/info">信息发布</Link>,
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: <Link to="/layout/score">成绩管理</Link>,
                        },
                    ]}
                />
            </Sider>
            <Layout className="layout-content"> {/* 添加className */}
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 'calc(100vh - 64px - 48px)', // 计算剩余高度
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        overflow: 'auto', // 内容溢出时可滚动
                    }}
                >
                    <Outlet></Outlet>
                </Content>
            </Layout>
        </Layout>
    )
}

export default MainLayout;