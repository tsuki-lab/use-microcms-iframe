# useMicroCMSIframe

microCMS の[外部データ連携（iframe フィールド）](https://document.microcms.io/manual/iframe-field)で利用するイベントをカスタムフック化したパッケージです。

## Quick start

```shell
npm install use-microcms-iframe
```

Use simple.

```tsx
import { useMicroCMSIframe } from 'use-microcms-iframe'

type FormState = {
  id: string
}

export const Component: React.FC = () => {
  const [ state, setState ] = useState<FormState>({ id: '' })
  const [ defaultMessage, postHandler ] = useMicroCMSIframe<FormState>()

  useEffect(() => {
    if (!defaultMessage?.data) return
    // microCMSに登録されている情報をStateに詰める
    setState(defaultMessage.data) // { id: 'xxxxxxxx' }
  }, [defaultMessage])

  useEffect(() => {
    // stateが変更されたら window.parent.postMessage イベントを用いてmicroCMSにデータを送る。
    postHandler({
      id: state.id
      data: state
    })
  }, [state, postHandler])

  return <input type="text" value={state.id} onChange={(e) => setState({ id: e.target.value })} />
}
```

## Description

```ts
const [defaultMessage, postHandler, postState] = useMicroCMSIframe<T>(options)
```

### defaultMessage

アクションタイプ `MICROCMS_GET_DEFAULT_DATA` で獲得した message データが格納されています。

```ts
type Message<T> = {
  id?: string
  title?: string
  description?: string
  imageUrl?: string
  updatedAt?: string
  data: T | null
}
```

[初期値の取得｜外部データ連携（iframe フィールド）](https://document.microcms.io/manual/iframe-field#h9e44c21a42)

### postHandler

アクションタイプ`MICROCMS_POST_DATA`を`window.parent.postMessage`メソッドで microCMS にデータを渡します。

```ts
const message = {
  id: '',
  title: '',
  description: '',
  imageUrl: '',
  updatedAt: '',
  data: null,
}

postHandler(message)
```

microCMS の管理画面内で管理しやすいように設定する任意項目。コンテンツ一覧画面等で表示されます。

- id（String）
- title（String）
- description（String）
- imageUrl（String: URL 形式）
- updatedAt（Date）

API レスポンス用のフィールド。指定した値が実際にコンテンツの GET API から iframe フィールド用の値として返却されます。

- data（型不定）

[データの送信｜外部データ連携（iframe フィールド）](https://document.microcms.io/manual/iframe-field#h7f543cc470)

### postState

[postHandler](#posthandler)で実行した結果を管理している State です。<br />
アクションタイプ`MICROCMS_POST_DATA_SUCCESS`、`MICROCMS_POST_DATA_FAILURE`のいずれかの情報が入ります。

```ts
export type PostDataSuccessMessage<T> = {
  id: string
  action: 'MICROCMS_POST_DATA_SUCCESS'
  message: Partial<Message<T>>
}

export type PostDataFailureMessage = {
  id: string
  action: 'MICROCMS_POST_DATA_FAILURE'
  error: string
}

export type MicroCMSIframePostState<T> = PostDataSuccessMessage<T> | PostDataFailureMessage
```

[レスポンス｜外部データ連携（iframe フィールド）](https://document.microcms.io/manual/iframe-field#h349fe0c3e0)

### options

`useMicroCMSIframe`の第一引数にオプションを渡すことができます。<br>
アクションタイプ`MICROCMS_UPDATE_STYLE`及び、管理画面の originUrl を指定することができます。指定することで、よりセキュアな通信を行うことができます。（デフォルトで管理画面の URL を動的に取得します。）

```ts
const options = {
  height: 500,
  width: '100%',
  origin: 'https://example.microcms.io',
}
```

| key    | description                               |
| ------ | ----------------------------------------- |
| height | string \| number (default: 300)           |
| width  | string \| number (default: '100%')        |
| origin | url string (default: MessageEvent.origin) |
