import { createRoot } from 'react-dom/client'
import React from 'react'
import { createPortal } from 'react-dom'

const root = createRoot(document.getElementById('root'))

function Modal() {
  // const portalObject = createPortal(<div id='foo'>foo</div>, document.getElementById('root2'))
  // console.log(portalObject);
  // return portalObject

  const fragmentObject = (
    <React.Fragment>
      <div id='foo'>foo</div>
    </React.Fragment>
  )
  console.log(fragmentObject);
  return fragmentObject
}

root.render(<Modal />)
