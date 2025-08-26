<div id="foo" ref={fooRef} key={index}>
  <div id="bar">bar</div>
  <div id="baz">baz</div>
  <div id="qux">qux</div>
</div>

React.createElement(
  'div',
  {id: 'foo'},
  React.createElement('div', {id: 'bar'}, 'bar'),
  React.createElement('div', {id: 'baz'}, 'baz'),
  React.createElement('div', {id: 'qux'}, 'qux'),
)

props = {
  id: 'foo',
  ref: fooRef,
  key: index,
  name: 'xxx',
  age: 'xxx',
  children: [
    {},
    {},
    {}
  ]
}
