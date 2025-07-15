import './index.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setScore, resetScore } from '../../store/modules/questional';
import { useDispatch } from 'react-redux';

export default function Index() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const restartQuiz = () => {
    dispatch(resetScore());
    navigate('/question');
  };

  const goHome = () => {
    dispatch(resetScore());
    navigate('/');
  };

  const { score } = useSelector((state: { questional: { score: number } }) => state.questional);

  useEffect(() => {
    dispatch(setScore());
  }, []);
  const comment = () => {
    if (score === 100) {
      return '学霸本霸！🎓 你就是传说中的答题机器！'
    } else if (score >= 80) {
      return '很不错哦！🌟 再努力一点就能成为学霸啦！'
    } else if (score >= 60) {
      return '刚好及格 😅 恭喜你踩线成功！'
    } else if (score >= 40) {
      return '加油加油！✨ 再刷几遍题目就能进步啦！'
    } else {
      return '哎呀呀... 🤦‍♂️ 建议重新来一遍，或者换个题目试试？'
    }
  }
  return (
    <div className="result-container">
      <div className="result-container-hd">
        <div className="result-container-hd-title">
          测试结果
        </div>
      </div>
      <div className="result-container-bd">
        <div className="result-container-bd-title">
          您的得分{score}分
        </div>
        <div className="result-container-bd-desc">
          您的得分{score}分，{comment()}
        </div>
        <div className="result-container-bd-actions">
          <button className="btn btn-primary" onClick={restartQuiz}>
            重新测试
          </button>
          <button className="btn btn-secondary" onClick={goHome}>
            返回首页
          </button>
        </div>
      </div>
    </div>
  )
}
