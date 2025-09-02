"use strict";
function Title() {
    return (MiniReact.createElement(React.Fragment, null,
        MiniReact.createElement("h1", null, "\u6211\u662F\u6807\u9898"),
        MiniReact.createElement("p", null, "\u4F60\u597D")));
}
function App() {
    return (MiniReact.createElement(Title, null, "\u6807\u9898"));
}
React.createElement(App, {}, React.createElement(Title, {}, React.createElement('h1', {}, '标题'), React.createElement('p', {}, '你好')));
