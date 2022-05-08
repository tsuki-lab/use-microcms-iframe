import type { AppProps } from 'next/app'
import 'mvp.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
