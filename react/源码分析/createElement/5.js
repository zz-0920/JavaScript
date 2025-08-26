const element = (
  <h1 className="greeting">
    hello world
  </h1>
)

const element = React.createElement(
  'h1',
  { className: 'greeting' },
  'hello world'
)

const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'hello world',
  }
}