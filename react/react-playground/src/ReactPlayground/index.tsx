import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Header from '../components/Header'
import CodeEditor from '../components/CodeEditor'
import Preview from '../components/Preview'


export default function ReactPlayground() {
  return (
    <div style={{width: '100%', height: '100vh'}}>
      <Header />

      <Allotment defaultSizes={[100, 100]}>
        <Allotment.Pane minSize={500}>
          <CodeEditor />
        </Allotment.Pane>

        <Allotment.Pane minSize={375}>
          <Preview />
        </Allotment.Pane>

      </Allotment>
    </div>
  )
}
