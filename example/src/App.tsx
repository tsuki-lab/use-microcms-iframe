import React, { useCallback } from 'react'
import { useMicroCMSIframe } from 'use-microcms-iframe'
import 'ress'
import './app.css'

function App() {
  const { state, post } = useMicroCMSIframe<string>()

  return <textarea
    value={state?.message?.data ?? ''}
    onChange={(e) => {
      post({
        description: e.target.value,
        data: e.target.value
      })
    }} />
}

export default App
