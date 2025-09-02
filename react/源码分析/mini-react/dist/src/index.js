"use strict";
function Title() {
    return MiniReact.createElement("h1", null, "hello world");
}
const content = MiniReact.createElement("div", null,
    MiniReact.createElement(Title, null));
MiniReact.render(content, document.getElementById("root"));
console.log(JSON.stringify(content));
