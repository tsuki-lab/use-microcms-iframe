import {
  Message,
  PostMessageParams,
  UpdateStyleMessage,
  UpdateStyleMessageParams,
} from './use-microcms-iframe.types'

const updateStyleParamsParser = (
  id: string,
  message: UpdateStyleMessage
): UpdateStyleMessageParams => {
  return {
    id,
    action: 'MICROCMS_UPDATE_STYLE',
    message,
  }
}

const postMessageParamsParser = <T>(
  id: string,
  message: Message<T>
): PostMessageParams<T> => {
  return {
    id,
    action: 'MICROCMS_POST_DATA',
    message,
  }
}

type PostIframeMessageType<T> = {
  data: Message<T>
  style: UpdateStyleMessage
}

export const postIframeMessage = <T, K extends keyof PostIframeMessageType<T>>(
  type: K,
  message: PostIframeMessageType<T>[K],
  id: string,
  origin: string
): void => {
  switch (type) {
    case 'style':
      window.parent.postMessage(
        updateStyleParamsParser(id, message as UpdateStyleMessage),
        origin
      )
      return
    case 'data':
      window.parent.postMessage(
        postMessageParamsParser(id, message as Message<T>),
        origin
      )
      return
  }
}
