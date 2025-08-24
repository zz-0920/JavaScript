import React from "react"

{/* <div id="foo">bar</div>
React.createElement('div', {id: 'foo'}, 'bar') */}

function  Foo({id}) {
    return <div id={id}>bar</div>
}
<Foo id="foo" >
    <div id="bar">bar</div>
</Foo>

function Foo({id, children}) {
    return React.createElement('div', {id}, 'foo')
}

React.createElement(Foo, {id: 'foo'}, 'bar')
