import { useEffect, useState } from 'react'
import './index.scss'
import { setQuestions, setAnswersId } from '../../store/modules/questional'
import { useDispatch } from 'react-redux'
import type { Ques, Answer } from '../../store/index.ts'
import { useNavigate } from 'react-router-dom'

export default function Index() {
  const [ques, setQues] = useState<Ques[]>([])
  const [num, setNum] = useState(1)
  const [isSelected, setIsSelected] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<Answer>()

  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const getData = async () => {
    const response = await fetch('https://mock.mengxuegu.com/mock/6767738f98077b17fe6792e2/question-naire')
    const data = await response.json()
    console.log(data);
    dispatch(setQuestions(data.questions))  // 存仓库给结果页面使用
    setQues(data.questions)  // 存当前页使用
  }
  useEffect(() => {  // 组件初次加载
    getData()
  }, [])

  const selectAnswer = (item: Answer) => { // 选择答案
    // 将用户选择的答案id 存起来  
    setSelectedAnswer(item)
    setIsSelected(true)
  }

  const nextTopic = () => {
    if (!isSelected) {
      return alert('请选择答案')
    }
    if (num === ques.length) {
      if (selectedAnswer) {
        dispatch(setAnswersId(selectedAnswer.is_standard_answer))
      }
      navigate('/result')
    } else {
      if (selectedAnswer) {
        dispatch(setAnswersId(selectedAnswer.is_standard_answer))
      }
      setNum(num + 1)
      // 重置下一题的选择状态
      setIsSelected(false)
      setSelectedAnswer(undefined)
    }
  }

  return (
    <div className='question-container'>
      <div className='question-container-hd'>
        <div className="question-container-hd-title">第 {num}/{ques.length} 题</div>
        <div className="question-container-hd-progress">
          <div className="question-container-hd-progress-bar" style={{ width: `${num / ques.length * 100}%` }}></div>
        </div>
      </div>
      <div className="question-container-bd">
        <div className="question-container-bd-option">
          <div className="question-container-bd-option-card">
            <div className="order">Q{num}</div>
            <div className="title">{ques[num - 1]?.topic_name}</div>
            <ul className='list'>
              {
                ques[num - 1]?.topic_answer.map((item: Answer) => {
                  return (
                    <li key={item.topic_answer_id}>
                      <input 
                        type="radio" 
                        name='item' 
                        id={`item${item.topic_answer_id}`} 
                        onChange={() => selectAnswer(item)} />
                      <label htmlFor={`item${item.topic_answer_id}`}>{item.answer_name}</label>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
      <div className="question-container-ft">
        <div className="btn" onClick={nextTopic}>{num === ques.length ? '提交' : '下一题'}</div>
      </div>
    </div>
  )
}
