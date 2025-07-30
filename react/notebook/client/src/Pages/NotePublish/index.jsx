import Editor from '@/components/Editor'
import { Cell, Input, hooks, Uploader, ActionSheet, Button } from 'react-vant'
import { Arrow } from '@react-vant/icons';

const actions = [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }]

export default function NotePublic() {
  const [state, updateState] = hooks.useSetState({
    title: '',
  })

  return (
    <div className='note-public'>
      <div className="editor">
        <Editor />
      </div>
      <div className="note-wrap">
        <div className="note-cell">
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

        <div className="note-cell">
          <Cell>
            <Uploader
              uploadText='上传图片'
              accept='*'
              onChange={v => console.log(v)}
            />
          </Cell>
        </div>

        <div className="note-cell">
          <Cell>
            <div>
              <span>选择分类</span>
              <span>美食 <Arrow /> </span>
            </div>
          </Cell>

          <ActionSheet
            visible={false}
            actions={actions}
          />
        </div>
      </div>

      <div className="btn">
        <Cell>
          <Button type='primary' block>发布日记</Button>
        </Cell>
      </div>
    </div>
  )
}