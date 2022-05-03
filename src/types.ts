export type MicroCMSIframeOptions = {
  height: string | number
  width: string | number
  origin: string
}

export type Message<T> = {
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
  message: Partial<Message<T>>
}

export type MicroCMSIframePostState<T> =
  | PostDataSuccessMessage<T>
  | PostDataFailureMessage

export type ParsedMessageEventData<T> = Omit<MessageEvent, 'data'> & {
  data: T
}

export type GetDefaultDataMessage<T> = {
  id: string
  action: 'MICROCMS_GET_DEFAULT_DATA'
  message?: Partial<Message<T>>
  // NOTE: Release to 2022/5/10
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
