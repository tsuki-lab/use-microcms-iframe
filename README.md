# useMicroCMSIframe

[![npm version](https://badge.fury.io/js/use-microcms-iframe.svg)](https://badge.fury.io/js/use-microcms-iframe)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

microCMS の[外部データ連携（iframe フィールド）](https://document.microcms.io/manual/iframe-field)で利用するイベントをカスタムフック化したパッケージです。

## Quick start

```shell
npm install use-microcms-iframe
```

Use simple.

```tsx
import { useMicroCMSIframe } from 'use-microcms-iframe'

export const Component: React.FC = () => {
  const [state, setState] = useMicroCMSIframe({ text: '' })

  return <input type="text" value={state.text} onChange={(e) => setState({ text: e.target.value })} />
}
```

## Description

```ts
type State = {
  // ...
}

const [state, setState, postState, postMessageHandler] = useMicroCMSIframe<State>(initialState, options)
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

### initialState

[State](#state)の初期値になります。任意で渡すことができ、default は`null`です。

### options

`useMicroCMSIframe`の第二引数にオプションを渡すことができます。

| Option                 | Type             | Default              | Description                                                                                               |
| ---------------------- | ---------------- | -------------------- | --------------------------------------------------------------------------------------------------------- |
| height                 | string \| number | 300                  | microCMS に表示する高さを指定できます                                                                     |
| width                  | string \| number | '100%'               | microCMS に表示する横幅を指定できます                                                                     |
| origin                 | string           | MessageEvent.origin  | microCMS 管理画面 URL（https://example.microcms.microcms.io）を指定して、セキュアに通信することができます |
| parsePostMessageParams | (data: T) => T   | (data) => ({ data }) | `setState`実行時に microCMS に通知を送る際のパースすることができます                                      |

## Development

### Install dependencies

```shell
pnpm install
# or `pnpm i`
```

### Production build

```shell
pnpm build
```

### Production watch build

```shell
pnpm watch
```

### Install dependencies example

```shell
pnpm example:install
```

### Wake up local server example

```shell
pnpm example:dev
```
