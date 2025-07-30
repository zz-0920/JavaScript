import { useLocation, useNavigate } from 'react-router'
import { NavBar } from 'react-vant';
import { Search } from '@react-vant/icons'
import styles from './index.module.less'
import { useEffect, useState } from 'react';
import axios from '../../api/axios.js'
import { format } from 'date-fns'
import Pull from '../../components/Pull/index.jsx'

export default function NoteList() {
    const { state } = useLocation()
    const navigate = useNavigate()
    const [noteList, setNoteList] = useState([])

    // 封装数据获取逻辑
    const fetchNoteList = async () => {
        try {
            const res = await axios.get(`/findNodeListByType?note_type=${state.title}`)
            // console.log(res.data)
            if (Array.isArray(res.data) && res.data.length > 0) {
                const formattedData = res.data.map(item => ({
                    ...item,
                    create_time: format(new Date(parseInt(item.create_time)), 'yyyy-MM-dd'),
                    update_time: format(new Date(parseInt(item.update_time)), 'yyyy-MM-dd')
                }))
                setNoteList(formattedData)
            } else {
                console.log('没有数据或数据格式不正确')
                setNoteList([])
            }
        } catch (error) {
            console.error('获取笔记列表失败:', error)
        }
    }

    useEffect(() => {
        fetchNoteList()
    }, [])

    // 下拉刷新回调函数
    const handleRefresh = async () => {
        await fetchNoteList()
    }

    return (
        <div className={styles['note-list']}>
            <header className={styles['header']}>
                <NavBar
                    title={state?.title}
                    leftText="返回"
                    rightText={<Search fontSize={20} />}
                    onClickLeft={() => navigate(-1)}
                    onClickRight={() => {}}
                />
            </header>
            <Pull onRefresh={handleRefresh}>
                <section className={styles['section']}>
                    <ul>
                        {
                            noteList.map((item) => (
                                <li key={item.id} onClick={() => navigate(`/noteDetail?id=${item.id}`)}>
                                    <div className={styles['img']}>
                                        <img src={item.note_img} alt="" />
                                    </div>
                                    <div className={styles['time']}>{item.update_time}</div>
                                    <div className={styles['title']}>{item.note_title}</div>
                                </li>
                            ))
                        }
                    </ul>
                </section>
            </Pull>
        </div>
    )
}