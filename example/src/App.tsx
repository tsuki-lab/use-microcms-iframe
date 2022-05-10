import React from 'react'
import { useMicroCMSIframe } from 'use-microcms-iframe'
import 'ress'
import './app.css'

function App() {
  const [state, setState] = useMicroCMSIframe('', {
    height: 500,
    origin: import.meta.env.VITE_MICROCMS_SERVICE_URL,
    parseGetDefaultData: (defaultMessage) => {
      return defaultMessage?.description ?? ''
    },
    parsePostMessageParams: (data) => {
      return {
        description: data ?? '',
        data: null,
      }
    },
  })

  return <textarea value={state ?? ''} onChange={(e) => setState(e.target.value)} />
}

export default App
