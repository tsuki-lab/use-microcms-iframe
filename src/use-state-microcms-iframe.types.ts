import { Message, UseMicroCMSIframeOptions } from './use-microcms-iframe.types'

export type ParsePostMessageParams<T> = (data: T) => Message<T>

export type UseStateMicroCMSIframeOptions<T> = {
  parsePostMessageParams?: ParsePostMessageParams<T>
} & UseMicroCMSIframeOptions

export type UseStateMicroCMSIframeReturnValue<T> = [
  state: T,
  setState: React.Dispatch<React.SetStateAction<T>>
]
