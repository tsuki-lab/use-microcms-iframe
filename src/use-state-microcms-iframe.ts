import { useEffect, useMemo, useState } from 'react'
import { useMicroCMSIframe } from './use-microcms-iframe'
import {
  ParsePostMessageParams,
  UseStateMicroCMSIframeOptions,
  UseStateMicroCMSIframeReturnValue,
} from './use-state-microcms-iframe.types'
import { descriptionParser } from './use-state-microcms-iframe.utils'

export const useStateMicroCMSIframe = <T>(
  initialState: T,
  options?: UseStateMicroCMSIframeOptions<T>
): UseStateMicroCMSIframeReturnValue<T> => {
  const parsePostMessageParams = useMemo<ParsePostMessageParams<T>>(() => {
    return (
      options?.parsePostMessageParams ??
      ((data) => ({
        description: descriptionParser(data),
        data,
      }))
    )
  }, [options?.parsePostMessageParams])

  const [state, setState] = useState<T>(initialState)
  const { state: iframeState, post } = useMicroCMSIframe<T>({
    origin: options?.origin,
    height: options?.height,
    width: options?.width,
  })

  useEffect(() => {
    if (iframeState?.message) {
      setState(iframeState.message.data)
    }
  }, [iframeState])

  useEffect(() => {
    post(parsePostMessageParams(state))
  }, [parsePostMessageParams, post, state])

  return [state, setState]
}
