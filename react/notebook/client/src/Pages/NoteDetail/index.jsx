import styles from './index.module.less'
import { ArrowLeft } from '@react-vant/icons'
import { useNavigate } from 'react-router'
import axios from '../../api/axios.js'
import { useSearchParams } from 'react-router'
import { useState, useEffect } from 'react'

export default function NoteDetail() {
    const [searchParams] = useSearchParams()
    const id = searchParams.get('id')
    const [noteDetail, setNoteDetail] = useState({})
    const { nickname } = JSON.parse(localStorage.getItem('userInfo')) || {}

    const fetchNoteDetail = async () => {
        try {
            const res = await axios.get(`/findNoteDetailById?id=${id}`)
            
            if (res.data && Array.isArray(res.data) && res.data.length > 0) {
                setNoteDetail(res.data[0])  // 取数组的第一个元素
            } else {
                console.error('没有找到笔记数据')
                setNoteDetail({})
            }
        } catch (error) {
            console.error('获取笔记详情失败:', error)
        }
    }
    
    useEffect(() => {
        if (id) {
            fetchNoteDetail()
        } else {
            console.error('没有获取到 ID 参数')
        }
    }, [id])

    const navigate = useNavigate()
    
    // 添加条件渲染，避免数据为空时的问题
    if (!noteDetail || Object.keys(noteDetail).length === 0) {
        return <div>加载中...</div>
    }

    return (
        <div className={styles['note-detail']}>
            <div className={styles['back']}>
                {/* 修复可访问性问题：添加按钮包装和适当的属性 */}
                <button 
                    onClick={() => { navigate(-1) }}
                    className={styles['back-button']}
                    aria-label="返回上一页"
                    type="button"
                >
                    <ArrowLeft fontSize={20} />
                </button>
            </div>
            <div className={styles['note-img']}>
                {noteDetail.note_img && <img src={noteDetail.note_img} alt="" />}
            </div>
            <div className={styles['note-content']}>
                <div className={styles['tab']}>
                    <span className={styles['note_type']}>{noteDetail.note_type || '未知类型'}</span>
                    <span className={styles['author']}>{nickname}</span>
                </div>
                <p className={styles['title']}>{noteDetail.note_title || '无标题'}</p>
                <div className={styles['content']} dangerouslySetInnerHTML={{__html: noteDetail.note_content || '无内容'}}>
                </div>
            </div>
        </div>
    )
}