# use-microcms-iframe

[![npm version](https://badge.fury.io/js/use-microcms-iframe.svg)](https://badge.fury.io/js/use-microcms-iframe)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

microCMS の[外部データ連携（拡張フィールド）](https://document.microcms.io/manual/iframe-field)で利用するイベントをカスタムフック化したパッケージです。

このパッケージでは、[useMicroCMSIframe](#usemicrocmsiframe)と[useStateMicroCMSIframe]()という二つのカスタムフックを提供しています。

## Quick start

```shell
npm install use-microcms-iframe
# or
yarn add use-microcms-iframe
```

Use simple.

```tsx
import { useMicroCMSIframe } from 'use-microcms-iframe'

function App() {
  const { state, post } = useMicroCMSIframe<string>()

  return (
    <input
      type="text"
      value={state?.message?.data ?? ''}
      onChange={(e) => {
        post({
          description: e.target.value,
          data: e.target.value,
        })
      }}
    />
  )
}
```

# useMicroCMSIframe

## Usage

```tsx
import { useMicroCMSIframe } from 'use-microcms-iframe'

function App() {
  const { state, post } = useMicroCMSIframe<string>()

  return (
    <input
      type="text"
      value={state?.message?.data ?? ''}
      onChange={(e) => {
        post({
          description: e.target.value,
          data: e.target.value,
        })
      }}
    />
  )
}
```

## Description

```ts
type State = {
  // ...
}

const options = {
  height: 500,
  origin: 'https://example.microcms.microcms.io',
}

const { state, post, postState } = useMicroCMSIframe<State>(options)
```

### state

アクションタイプ `MICROCMS_GET_DEFAULT_DATA` で獲得した **State** を取り扱うことができます。

[初期値の取得｜外部データ連携（拡張フィールド）](https://document.microcms.io/manual/iframe-field#h9e44c21a42)

### post

アクションタイプ`MICROCMS_POST_DATA`を実行することができます。

```ts
// post {UseMicroCMSIframePost}
type UseMicroCMSIframePost = <State>(message: {
  id?: string
  title?: string
  description?: string
  imageUrl?: string
  updatedAt?: string
  data: State
}) => void
```

[データの送信｜外部データ連携（拡張フィールド）](https://document.microcms.io/manual/iframe-field#h7f543cc470)

### postState

[post()](#post)を実行した際の結果を管理している State です。<br />
アクションタイプ`MICROCMS_POST_DATA_SUCCESS`、`MICROCMS_POST_DATA_FAILURE`のいずれかの情報が入ります。

```ts
// postState {MicroCMSIframePostState<State>}
export type MicroCMSIframePostState<State> =
  | PostDataSuccessMessage<State>
  | PostDataFailureMessage

export type PostDataSuccessMessage<State> = {
  id: string
  action: 'MICROCMS_POST_DATA_SUCCESS'
  message: Message<State>
}

export type PostDataFailureMessage = {
  id: string
  action: 'MICROCMS_POST_DATA_FAILURE'
  error: string
}
```

[レスポンス｜外部データ連携（拡張フィールド）](https://document.microcms.io/manual/iframe-field#h349fe0c3e0)

## Options

| Key    | Type             | Default             | Description                                                                                                           |
| ------ | ---------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| height | string \| number | 300                 | microCMS に表示する高さを指定できます。                                                                               |
| width  | string \| number | '100%'              | microCMS に表示する横幅を指定できます。                                                                               |
| origin | string           | MessageEvent.origin | microCMS 管理画面 URL（https://\<serviceId\>.microcms.microcms.io）を指定することでセキュアに通信することができます。 |

# useStateMicroCMSIframe

[useMicroCMSIframe](#usemicrocmsiframe)をラップして`useState`と同じように扱えるようにしたカスタムフックです。

## Usage

```tsx
import { useStateMicroCMSIframe } from 'use-microcms-iframe'

function App() {
  const [state, setState] = useStateMicroCMSIframe('')

  return (
    <input
      type="text"
      value={state}
      onChange={(e) => setState(e.target.value)}
    />
  )
}
```

## Description

```ts
type State = {
  // ...
}

const initialState: State = {
  // ...
}

const options = {
  height: 500,
  origin: 'https://example.microcms.microcms.io',
}

const [state, setState] = useStateMicroCMSIframe<State>(initialState, options)
```

### state, setState

`useStateMicroCMSIframe`内部で利用している`useState`の戻り値をそのまま返しています。

[useState ｜ React Reference](https://reactjs.org/docs/hooks-reference.html#usestate)

## Options

[Options ｜ useMicroCMSIframe](#options)に加え下記の指定が可能です。

### parsePostMessageParams

アクションタイプ`MICROCMS_POST_DATA`を実行する際の Message を整形するためのオプションです。<br>
デフォルトでは、State の情報を`data`と`description`に紐づけられるように設定されています。

[データの送信｜外部データ連携（拡張フィールド）](https://document.microcms.io/manual/iframe-field#h7f543cc470)

#### example

```ts
type State = {
  id: string
  text: string
}

const initialState: State = {
  id: '',
  text: ''
}

const [state, setState] = useStateMicroCMSIframe<State>(initialState, {
  parsePostMessageParams: (data) => ({
    id: data.id
    description: data.text,
    data
  }),
})
```
