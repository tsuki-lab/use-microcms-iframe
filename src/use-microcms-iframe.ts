import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Message,
  MicroCMSIframeOptions,
  MicroCMSIframePostState,
  MicroCMSIframeState,
  MicroCMSMessageEvent,
  PostDataMessage,
  UpdateStyleMessage,
} from './types'

const defaultStyles = {
  height: 300,
  width: '100%',
}

const defaultMessage = {
  id: '',
  title: '',
  description: '',
  imageUrl: '',
  updatedAt: '',
  data: null,
}

const defaultParsePostMessageParams = <T>(data: T | null) => ({ data })

export const useMicroCMSIframe = <T>(
  initialMessageDataState?: T,
  options?: Partial<MicroCMSIframeOptions<T>>
): [
  state: T | null,
  setState: React.Dispatch<React.SetStateAction<T | null>>,
  postState: MicroCMSIframePostState<T> | undefined,
  postMessageHandler: (message: Partial<Message<T>>) => void
] => {
  const parsePostMessageParams = options?.parsePostMessageParams || defaultParsePostMessageParams

  const mounted = useRef(false)

  const [messageDataState, setMessageDataState] = useState<T | null>(initialMessageDataState || null)
  const [microCMSState, setMicroCMSState] = useState<MicroCMSIframeState<T>>({
    iframeId: '',
    origin: '',
    defaultMessage,
    user: {
      email: '',
    },
  })
  const [postState, setPostState] = useState<MicroCMSIframePostState<T>>()

  /** Initialize useMicroCMSIframe.  */
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      window.addEventListener('message', (e: MicroCMSMessageEvent<T>) => {
        if (e.isTrusted !== true) return
        const origin = options?.origin || e.origin

        if (origin !== e.origin && origin !== '*') return

        switch (e.data.action) {
          case 'MICROCMS_GET_DEFAULT_DATA': {
            setMicroCMSState({
              iframeId: e.data.id,
              origin,
              defaultMessage: e.data.message || defaultMessage,
              user: e.data.user,
            })
            setMessageDataState(e.data.message?.data || initialMessageDataState || null)

            const updateStyleMessage: UpdateStyleMessage = {
              id: e.data.id,
              action: 'MICROCMS_UPDATE_STYLE',
              message: Object.assign(defaultStyles, {
                height: options?.height,
                width: options?.width,
              }),
            }

            window.parent.postMessage(updateStyleMessage, origin)
            break
          }

          case 'MICROCMS_POST_DATA_SUCCESS':
          case 'MICROCMS_POST_DATA_FAILURE': {
            setPostState(e.data)
            break
          }
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const postMessageHandler = useCallback(
    (message: Partial<Message<T>>) => {
      if (microCMSState.iframeId && microCMSState.origin) {
        const postDataMessage: PostDataMessage<T> = {
          id: microCMSState.iframeId,
          action: 'MICROCMS_POST_DATA',
          message: message,
        }

        window.parent.postMessage(postDataMessage, microCMSState.origin)
      }
    },
    [microCMSState]
  )

  /** Execute postMessageHandler when updated messageDataState.  */
  useEffect(() => {
    const message = parsePostMessageParams(messageDataState)
    postMessageHandler(message)
  }, [messageDataState, parsePostMessageParams, postMessageHandler])

  return [messageDataState, setMessageDataState, postState, postMessageHandler]
}
