import type { NextPage } from 'next'
import Head from 'next/head'
import { useMicroCMSIframe } from 'use-microcms-iframe'

const Home: NextPage = () => {
  const [state, setState] = useMicroCMSIframe({
    title: '',
    description: ''
  })
  return (
    <main>
      <Head>
        <title>example-next-app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form>
        <input type="text" value={state?.title} onChange={(e) => setState(prev => (prev && { ...prev, title: e.target.value }))} />
        <textarea value={state?.description} onChange={(e) => setState(prev => (prev && { ...prev, description: e.target.value }))}>
        </textarea>
      </form>
    </main>
  )
}

export default Home
