import React from "react"

{/* <div id="foo">bar</div>
React.createElement('div', { id: 'foo' }, 'bar') */}

Foo.defaultProps = {
  id: 'foo',
}
function Foo({ id }) {
  return <div id={id}>foo</div>
}
<Foo id="foo">
  <div id="bar">bar</div>
</Foo>

function Foo({ id }) {
  return React.createElement('div', { id }, 'foo')
}
React.createElement(
  Foo,
  { id: 'foo' },
  React.createElement(
    'div',
    { id: 'bar' },
    'bar'
  )
)
