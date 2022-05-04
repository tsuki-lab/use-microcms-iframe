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
  const [state, setState] = useMicroCMSIframe<FormState>()

  return <input type="text" value={state.id} onChange={(e) => setState({ id: e.target.value })} />
}
```

## Description

```ts
type State = {
  // ...
}

const [state, setState, postState, postMessageHandler] = useMicroCMSIframe<State>(options)
```

### state

アクションタイプ `MICROCMS_GET_DEFAULT_DATA` で獲得した **State** が格納されています。

[初期値の取得｜外部データ連携（iframe フィールド）](https://document.microcms.io/manual/iframe-field#h9e44c21a42)

### setState

[state](#state)情報を更新するためのメソッドです。<br />
更新時に、[postMessageHandler](#postmessagehandler)を内部で実行します。

```ts
setState({
  // type State
})
```

### postState

[postMessageHandler](#postmessagehandler)で実行した結果を管理している State です。<br />
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

### postMessageHandler

アクションタイプ`MICROCMS_POST_DATA`を`window.parent.postMessage`メソッドで microCMS にデータを渡します。

microCMS の管理画面内で管理しやすいように設定する任意項目。コンテンツ一覧画面等で表示されます。

- id（String）
- title（String）
- description（String）
- imageUrl（String: URL 形式）
- updatedAt（Date）

API レスポンス用のフィールド。指定した値が実際にコンテンツの GET API から iframe フィールド用の値として返却されます。

- data（型不定）

[データの送信｜外部データ連携（iframe フィールド）](https://document.microcms.io/manual/iframe-field#h7f543cc470)

### options

`useMicroCMSIframe`の第一引数にオプションを渡すことができます。<br>
アクションタイプ`MICROCMS_UPDATE_STYLE`に渡す message データ、[setState](#setstate)時に microCMS に登録する情報を変更するメソッド、`window.parent.postMessage`の第二引数を指定することができます。origin を指定することで、よりセキュアな通信を行うことができます。（デフォルトで iframe を読み込んだ microCMS 管理画面の URL を動的に取得します。）

```ts
const options = {
  height: 500,
  width: '100%',
  origin: 'https://example.microcms.io',
  parsePostMessageParams: (data) => ({
    title: data?.title || '',
    data,
  }),
}
```

| key                    | description                                |
| ---------------------- | ------------------------------------------ |
| height                 | string \| number (default: 300)            |
| width                  | string \| number (default: '100%')         |
| origin                 | url string (default: MessageEvent.origin)  |
| parsePostMessageParams | url string (default: (data) => ({ data })) |

[スタイルの変更｜外部データ連携（iframe フィールド）](https://document.microcms.io/manual/iframe-field#hddc40608fe)
