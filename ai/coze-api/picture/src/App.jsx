import { useState, useRef } from 'react'
import './app.css'

export default function App() {
  const fileRef = useRef(null)
  const [imgPreview, setImgPreview] = useState('https://res.bearbobo.com/resource/upload/W44yyxvl/upload-ih56twxirei.png')
  const [imgUrl, setImgUrl] = useState('null')  // 工作流生成的图片
  const [status, setStatus] = useState('')  // 工作流当前的状态

  const updateImageData = () => {
    // console.log(fileRef.current.files[0]);
    const file = fileRef.current.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file) // 读成base64
    reader.onload = () => {
      setImgPreview(reader.result)
    }
  }

  const [uniform_number, setUniformNumber] = useState(10)
  const [uniform_color, setUniformColor] = useState('红')
  const [position, setPosition] = useState(0)
  const [shooting_hand, setShootingHand] = useState(1)
  const [style, setStyle] = useState('写实')

  const patToken = import.meta.env.VITE_PAT_TOKEN
  const uploadUrl = 'https://api.coze.cn/v1/files/upload'  // 上传 && 鉴权的地址
  const workflowUrl = 'https://api.coze.cn/v1/workflow/run'  // 工作流的地址
  const workflow_id = '7536784945794105353'


  async function uploadFile() {
    const formData = new FormData()
    const inputFile = fileRef.current.files[0]
    if (!inputFile) return
    formData.append('file', inputFile)  // 将文件对象转换成 form 数据 二进制

    const res = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${patToken}`
      },
      body: formData
    })
    const ret = await res.json()
    if (ret.code !== 0) {
      console.log(ret);
      return
    }
    return ret.data.id
  }


  const generate = async() => {
    // 上传图片
    setStatus('上传中...')
    const file_id = await uploadFile()
    setStatus('上传完成，正在生成...')

    // 调用工作流
    const res = await fetch(workflowUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${patToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        workflow_id,
        parameters: {
          picture: JSON.stringify({file_id}),
          style,
          uniform_number,
          uniform_color,
          position,
          shooting_hand,
        }
      })
    })
    const ret = await res.json()
    const data = JSON.parse(ret.data).answer
    setStatus('生成完成')
    setImgUrl(data)
  }


  return (
    <div className='container'>
      <div className="input">

        <div className="file-input">
          <input ref={fileRef} type="file" id='image' name='image' accept='image/*' required onChange={updateImageData}/>
        </div>

        <img className="preview" src={imgPreview} alt='preview'/>

        <div className="settings">
          <div className="selection">
            <label>队服编号：</label>
            <input type="number" onChange={(e) => setUniformNumber(e.target.value)}/>
          </div>
          <div className="selection">
            <label>队服颜色：</label>
            <select onChange={(e) => setUniformColor(e.target.value)}>
              <option value="红">红</option>
              <option value="蓝">蓝</option>
              <option value="绿">绿</option>
              <option value="黄">黄</option>
              <option value="白">白</option>
              <option value="黑">黑</option>
            </select>
          </div>
        </div>

        <div className="settings">
          <div className="selection">
            <label>位置：</label>
            <select onChange={(e) => setPosition(e.target.value)}>
              <option value="0">守门员</option>
              <option value="1">前锋</option>
              <option value="2">后卫</option>
            </select>
          </div>
          <div className="selection">
            <label>持杆：</label>
            <select onChange={(e) => setShootingHand(e.target.value)}>
              <option value="0">左手</option>
              <option value="1">右手</option>
            </select>
          </div>
          <div className="selection">
            <label>风格：</label>
            <select onChange={(e) => setStyle(e.target.value)}>
              <option value="国漫">国漫</option>
              <option value="乐高">乐高</option>
              <option value="写实">写实</option>
              <option value="卡通">卡通</option>
              <option value="油画">油画</option>
              <option value="素描">素描</option>
            </select>
          </div>
        </div>

        <div className="generate">
          <button onClick={generate}>生成</button>
        </div>

      </div>
      <div className="output">
        <div className="generated">
          <img src={imgUrl} alt="" />
          <div>{status}</div>
        </div>
      </div>
    </div>
  )
}