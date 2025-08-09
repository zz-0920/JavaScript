import PictureCard from './components/PictureCard'
import { useState } from 'react'
import './app.css'
import { generateAudio } from './lib/audio'

const userPrompt = `
  分析图片内容，找出最能描述该图片的一个单词，尽量选择更简单的A1～A2级别的单词。

  返回 JSON 数据：
  {
    "image_description": "图片的描述",
    "representative_word": "最能描述图片的单词",
    "example_sentence": "结合英文单词和图片描述，给出一个简单的例句",
    "explanation": "结合图片解析英文单词，段落以 Look at ... 开头，将段落分句，每句单独一行，解析的最后给一个日常生活有关的问句",
    "example_reply": ["根据explanation给出的回复 1", "根据explanation给出的回复 2"]
  }
`;

export default function App() {
    const [audio, setAudio] = useState('')
    const [sentence, setSentence] = useState('')
    const [imgPreview, setImgPreview] = useState(undefined as string | undefined)
    const [detailExpand, setDetailExpand] = useState(false)
    const [explanation, setExplanation] = useState('')
    const [reply, setReply] = useState<string[]>([])
    const [word, setWord] = useState('请上传图片')

    const submit = async (data: string) => {
        setImgPreview(data)
        setWord('分析中...')
        const endpoint = "https://api.moonshot.cn/v1/chat/completions"
        const header = {
            "Authorization": `Bearer ${import.meta.env.VITE_KIMI_API_KEY}`,
            "Content-Type": "application/json"
        }
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: header,
            body: JSON.stringify({
                "model": "moonshot-v1-8k-vision-preview",
                "messages": [
                    {
                        "role": "user",
                        "content": "你是一个专业的图片识别助手，我会给你上传一张图片，你需要识别图片中的文字，并返回文字的详细解释。"
                    },
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": data
                                }
                            },
                            {
                                "type": "text",
                                "text": userPrompt
                            }
                        ]
                    }
                ]
            })
        })

        const res = await response.json()
        console.log(res.choices[0].message.content)
        const json = JSON.parse(res.choices[0].message.content)
        setWord(json.representative_word)
        setSentence(json.example_sentence)
        setExplanation(json.explanation)
        setReply(json.example_reply)
        const audioUrl = await generateAudio(json.representative_word)
        setAudio(audioUrl)
    }

    return (
        <div className='container'>
            <PictureCard word={word} submit={submit} audio={audio} />
            <div className="output">
                <div>{sentence}</div>
                <div className='detail'>
                    <button onClick={() => setDetailExpand(!detailExpand)}>Talk about it</button>

                    {detailExpand ? (
                        <div className='expand'>
                            <img src={imgPreview} alt="" />
                            <div className='explanation'>
                                {
                                    explanation.split('\n').map((item: string, index: number) => (
                                        <p key={index}>{item}</p>
                                    ))
                                }
                            </div>
                            <div className='reply'>
                                {
                                    reply.map((item: string, index: number) => (
                                        <div key={index}>
                                            <p>{item}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ) : (
                        <div className='fold'></div>
                    )}
                </div>
            </div>
        </div>
    )
}
