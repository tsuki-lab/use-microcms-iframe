import React from 'react'
import { useMicroCMSIframe } from 'use-microcms-iframe'

function App() {
  const [state, setState] = useMicroCMSIframe({ text: '' })
  return <input type="text" value={state?.text} onChange={(e) => setState({ text: e.target.value })} />
}

export default App
