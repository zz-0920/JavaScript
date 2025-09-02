function Title() {
    return <h1>hello world</h1>
}

const content = <div>
    <Title />
</div>

MiniReact.render(content, document.getElementById("root"))


console.log(JSON.stringify(content));
