export type Message<T = null> = {
  id?: string
  title?: string
  description?: string
  imageUrl?: string
  updatedAt?: string
  data: T
}

export type UseMicroCMSIframeOptions = {
  height?: string | number
  width?: string | number
  origin?: string
}

export type UseMicroCMSIframeState<T> = {
  id: string
  origin: string
  user: {
    email: string
  }
  message?: Message<T>
}

export type UseMicroCMSIframePost = <T>(message: Message<T>) => void

export type UseMicroCMSIframeReturnValue<T> = {
  state: UseMicroCMSIframeState<T> | undefined
  post: UseMicroCMSIframePost
  postState: MicroCMSIframePostState<T> | undefined
}

export type MicroCMSMessageEvent<T> =
  | ParsedMessageEventData<GetDefaultDataMessage<T>>
  | ParsedMessageEventData<PostDataSuccessMessage<T>>
  | ParsedMessageEventData<PostDataFailureMessage>

export type ParsedMessageEventData<T> = Omit<MessageEvent, 'data'> & {
  data: T
}

export type MicroCMSIframePostState<T> =
  | PostDataSuccessMessage<T>
  | PostDataFailureMessage

export type GetDefaultDataMessage<T> = {
  id: string
  action: 'MICROCMS_GET_DEFAULT_DATA'
  message?: Message<T>
  user: {
    email: string
  }
}

export type PostDataSuccessMessage<T> = {
  id: string
  action: 'MICROCMS_POST_DATA_SUCCESS'
  message: Message<T>
}

export type PostDataFailureMessage = {
  id: string
  action: 'MICROCMS_POST_DATA_FAILURE'
  error: string
}

export type UpdateStyleMessageParams = {
  id: string
  action: 'MICROCMS_UPDATE_STYLE'
  message: UpdateStyleMessage
}

export type UpdateStyleMessage = {
  height: number | string
  width: number | string
}

export type PostMessageParams<T> = {
  id: string
  action: 'MICROCMS_POST_DATA'
  message: Message<T>
}
