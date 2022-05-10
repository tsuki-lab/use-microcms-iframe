export type ParseGetDefaultData = <T>(defaultMessage?: Partial<Message<T>>) => T | null
export type ParsePostMessageParams = <T>(data: T | null) => Partial<Message<T>>

export type UseMicroCMSIframe = <T>(
  initialMessageDataState?: T,
  options?: Partial<MicroCMSIframeOptions>
) => [
  messageDataState: T | null,
  setMessageDataState: React.Dispatch<React.SetStateAction<T | null>>,
  postState: MicroCMSIframePostState<T> | undefined,
  microCMSState: MicroCMSIframeState<T>
]

export type MicroCMSIframeOptions = {
  height: string | number
  width: string | number
  origin: string
  parseGetDefaultData: ParseGetDefaultData
  parsePostMessageParams: ParsePostMessageParams
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
  user: {
    email: string
  }
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
  user: {
    email: string
  }
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
