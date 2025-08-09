import { useState } from 'react'
import './index.css'

interface PictureCardProps {
    word: string,
    submit: (data: string) => void
    audio: string
}

export default function PictureCard({ word, submit, audio }: PictureCardProps) {
    const [imgPreview, setImgPreview] = useState('https://res.bearbobo.com/resource/upload/W44yyxvl/upload-ih56twxirei.png')
    const updateImageData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if(!file) return
        // 预览
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => { // 读取完成
                const data = reader.result as string
                setImgPreview(data)
                submit(data)
                resolve(data)
            }
            reader.onerror = () => {
                reject(new Error('读取文件失败'))
            }
        })
    }
    return (
        <div className='card'>
            <input id='selectImage' type="file" className='input' accept='.jpg,.png,.jpeg,.gif' onChange={updateImageData}/>
            <label htmlFor="selectImage" className='upload'>
                <img src={imgPreview} alt="" />
            </label>
            <div className='word'>
                {word}
            </div>
            <div className='playAudio' onClick={() => {
                const audioElement = new Audio(audio)
                audioElement.play()
            }}>
                <img style={{ width: 24 }} src="https://res.bearbobo.com/resource/upload/Omq2HFs8/playA-3iob5qyckpa.png" alt="" />
            </div>
        </div>
    )
}
