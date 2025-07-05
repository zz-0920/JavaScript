import './App6.css';
import React, { useState, useEffect } from 'react';
import { Input, Space, Table, Popconfirm } from 'antd';
const { Search } = Input;

// let btn = document.getElementById('btn')
// btn.addEventListener('click', () => {
//     fetch('https://mock.mengxuegu.com/mock/66585c4db462b81cb3916d3e/songer/songer?page=1', {
//         method: 'GET'
//     }).then((response) => {
//         return response.json()
//     }).then((data) => {
//         console.log(data);
//     })
// })
function App() {
    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '操作',
            dataIndex: 'do',
            key: 'do',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm title="确认删除？" onConfirm={() => onDelete(record.id)} >
                        <a href="#">删除</a>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/data', {
            method: 'GET'
        }).then((response) => {
            return response.json()
        }).then((data) => {
            setDataSource(data)
        })
    }, [])


    function onSearch(name) {
        fetch(`http://localhost:3001/data/?name=${name}`, {
            method: 'GET'
        }).then((response) => {
            return response.json()
        }).then((data) => {
            setDataSource(data)
        })
    }

    function onDelete(id) {
            fetch(`http://localhost:3001/data/${id}`, {
                method: 'delete'
            }).then(() => {
                const newData = dataSource.filter(item => item.id !== id);
                setDataSource(newData);
            })
    }


    return (
        <div className="container">
            <div className="search-box">
                <Search
                    placeholder='请输入关键词'
                    enterButton="搜索"
                    size="large"
                    allowClear
                    onSearch={onSearch}
                />
            </div>

            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
            />
        </div>
    )
}

export default App;