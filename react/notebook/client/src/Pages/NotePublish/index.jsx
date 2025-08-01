import { useState } from 'react'
import Editor from '@/components/Editor'
import { Cell, Input, hooks, Uploader, ActionSheet, Button, NavBar } from 'react-vant'
import { Arrow } from '@react-vant/icons';
import styles from './index.module.less'
import { useNavigate } from 'react-router'
import { Toast } from 'antd-mobile'
import axios from '../../api/axios.js';

const actions = [
    { name: '美食' },
    { name: '旅行' },
    { name: '恋爱' },
    { name: '学习' },
    { name: '吵架' }
]


export default function NotePublic() {


    const navigator = useNavigate()
    const [html, setHtml] = useState('')  // 编辑器内容
    const [state, updateState] = hooks.useSetState({  // 标题
        title: '',
    })
    const [noteImg, setNoteImg] = useState('')
    const [visible, setVisible] = useState(false)
    const [category, setCategory] = useState('美食')

    const onSelect = (action) => {
        setCategory(action.name)
        setVisible(false)
    }

    const onPublish = () => {
        console.log(noteImg);

        if (html.length <= 11) {
            Toast.show({
                content: '请输入日记内容',
                duration: 1000,
            })
            return
        }
        if (!state.title) {
            Toast.show({
                content: '请输入标题',
                duration: 1000,
            })
            return
        }

        axios.post('/note-publish', {
            note_title: state.title,
            note_content: html,
            note_img: noteImg,
            note_type: category,
            create_time: new Date().getTime(),
            update_time: new Date().getTime()
        }).then(res => {
            console.log(res);
            Toast.show({
                content: '发布成功',
                duration: 1000,
            })
            navigator(-1)
        })

    }

    return (
        <div className={styles['note-public']}>
            <div className={styles['back']}>
                <NavBar
                    title="写日记"
                    onClickLeft={() => navigator(-1)}
                />
            </div>

            <div className={styles['editor']}>
                <Editor setHtml={setHtml} html={html} />
            </div>
            <div className={styles['note-wrap']}>
                <div className={styles['note-cell']}>
                    <Cell>
                        <Input
                            prefix={'标题：'}
                            value={state.title}
                            onChange={title => updateState({ title })}
                            placeholder='请输入标题'
                            clearable
                        />
                    </Cell>
                </div>

                <div className={styles['note-cell']}>
                    <Cell>
                        <Uploader
                            uploadText='上传图片'
                            accept='*'
                            maxCount={1}
                            onChange={v => setNoteImg(v[0].url)}
                        />
                    </Cell>
                </div>

                <div className={styles['note-cell']}>
                    <Cell>
                        <div className={styles['select']}>
                            <span>选择分类</span>
                            <span className={styles['select-item']} onClick={() => setVisible(true)}> {category} <Arrow /> </span>
                        </div>
                    </Cell>

                    <ActionSheet
                        visible={visible}
                        onCancel={() => setVisible(false)}
                        onSelect={onSelect}
                        actions={actions}
                    />
                </div>
            </div>

            <div className={styles['btn']}>
                <Cell>
                    <Button type='primary' block onClick={onPublish}>发布日记</Button>
                </Cell>
            </div>
        </div>
    )
}