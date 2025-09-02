function Title() {
    return (
        <>
            <h1>我是标题</h1>
            <p>你好</p>
        </>
    )
}

function App() {
    return (
        <Title>标题</Title>
    )
}

React.createElement(
    App,
    {},
    React.createElement(
        Title,
        {},
        React.createElement(
            'h1',
            {},
            '标题'
        ),
        React.createElement(
            'p',
            {},
            '你好'
        )
    )
)