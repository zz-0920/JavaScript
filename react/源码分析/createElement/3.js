const RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true,
};

export function createElement(type, config, ...children) {
  let propName;

  // Reserved names are extracted
  const props = {};

  // 第一段
  let key = '' + config.key;
  let ref = config.ref;
  let self = config.__self;
  let source = config.__source;

  // 第二段
  for (propName in config) {
    if (config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
      props[propName] = config[propName];
    }
  }

  // 第三段
  props.children = children;

  // 第四段
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  // 第五段
  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props,
  );
}