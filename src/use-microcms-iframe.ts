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

export const useMicroCMSIframe = <T>(
  options?: Partial<MicroCMSIframeOptions>
): [
  message: Partial<Message<T>>,
  postHandler: (payload: Partial<Message<T>>) => void,
  postState?: MicroCMSIframePostState<T>
] => {
  const mounted = useRef(false)
  const [postState, setPostState] = useState<MicroCMSIframePostState<T>>()
  const [state, setState] = useState<MicroCMSIframeState<T>>({
    iframeId: '',
    origin: '',
    message: defaultMessage,
  })

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      window.addEventListener('message', (e: MicroCMSMessageEvent<T>) => {
        if (e.isTrusted !== true) return

        switch (e.data.action) {
          case 'MICROCMS_GET_DEFAULT_DATA': {
            setState({
              iframeId: e.data.id,
              origin: e.origin,
              message: e.data.message || defaultMessage,
            })

            const updateStyleMessage: UpdateStyleMessage = {
              id: e.data.id,
              action: 'MICROCMS_UPDATE_STYLE',
              message: Object.assign(defaultStyles, {
                height: options?.height,
                width: options?.width,
              }),
            }

            window.parent.postMessage(
              updateStyleMessage,
              options?.origin || e.origin
            )
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

  const postHandler = useCallback(
    (message: Partial<Message<T>>) => {
      if (state.iframeId && state.origin) {
        const postDataMessage: PostDataMessage<T> = {
          id: state.iframeId,
          action: 'MICROCMS_POST_DATA',
          message: message,
        }

        window.parent.postMessage(postDataMessage, state.origin)
      }
    },
    [state]
  )

  return [state.message, postHandler, postState]
}
