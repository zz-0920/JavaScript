import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";

const root = createRoot(document.getElementById('root'))

function Modal() {
    const portalObject = createPortal(
        <div id="foo">foo</div>,
        document.getElementById('root2')
    )
}