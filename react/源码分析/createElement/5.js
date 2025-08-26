const element = (
  <h1 className="gretting">
    hello world
  </h1>
)

const element = React.createElement(
  'h1',
  { className: 'gretting' },
  'hello world'
)

const element = {
  type: 'h1',
  props: {
    className: 'gretting',
    children: 'hello world',
  }
}