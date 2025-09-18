import React from 'react';

interface HomePageProps {
  title?: string;
  message?: string;
}

const HomePage: React.FC<HomePageProps> = ({ 
  title = 'React SSR 示例', 
  message = '这是一个服务器端渲染的React页面！' 
}) => {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>
        {title}
      </h1>
      
      <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
        {message}
      </p>
      
      <div style={{
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2>交互式计数器</h2>
        <p>当前计数: <strong>{count}</strong></p>
        <button 
          onClick={handleClick}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          点击增加
        </button>
      </div>
      
      <div style={{
        backgroundColor: '#e9ecef',
        padding: '15px',
        borderRadius: '8px'
      }}>
        <h3>SSR 特性展示</h3>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li>✅ 服务器端预渲染HTML</li>
          <li>✅ 更快的首屏加载</li>
          <li>✅ 更好的SEO支持</li>
          <li>✅ 客户端水合(Hydration)</li>
        </ul>
      </div>
      
      <footer style={{ marginTop: '40px', color: '#999' }}>
        <p>React SSR Demo - 服务器时间: {new Date().toLocaleString('zh-CN')}</p>
      </footer>
    </div>
  );
};

export default HomePage;