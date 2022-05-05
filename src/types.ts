export type MicroCMSIframeOptions<T> = {
  height: string | number
  width: string | number
  origin: string
  parsePostMessageParams: (data: T | null) => Partial<Message<T>>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Message<T = any> = {
  id?: string
  title?: string
  description?: string
  imageUrl?: string
  updatedAt?: string
  data: T | null
}

export type MicroCMSIframeState<T> = {
  iframeId: string
  origin: string
  // NOTE: Release to 2022/5/10
  // https://blog.microcms.io/update-iframe/
  // user: {
  //   email: string
  // }
  defaultMessage: Partial<Message<T>>
}

export type MicroCMSIframePostState<T> = PostDataSuccessMessage<T> | PostDataFailureMessage

export type ParsedMessageEventData<T> = Omit<MessageEvent, 'data'> & {
  data: T
}

export type GetDefaultDataMessage<T> = {
  id: string
  action: 'MICROCMS_GET_DEFAULT_DATA'
  message?: Partial<Message<T>>
  // NOTE: Release to 2022/5/10
  // https://blog.microcms.io/update-iframe/
  // user: {
  //   email: string
  // }
}

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

export type MicroCMSMessageEvent<T> =
  | ParsedMessageEventData<GetDefaultDataMessage<T>>
  | ParsedMessageEventData<PostDataSuccessMessage<T>>
  | ParsedMessageEventData<PostDataFailureMessage>

export type UpdateStyleMessage = {
  id: string
  action: 'MICROCMS_UPDATE_STYLE'
  message: {
    height: number | string
    width: number | string
  }
}

export type PostDataMessage<T> = {
  id: string
  action: 'MICROCMS_POST_DATA'
  message: Partial<Message<T>>
}
