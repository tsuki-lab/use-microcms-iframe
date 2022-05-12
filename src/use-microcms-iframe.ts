import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Message,
  MicroCMSIframePostState,
  MicroCMSMessageEvent,
  UpdateStyleMessage,
  UseMicroCMSIframeState,
  UseMicroCMSIframeOptions,
  UseMicroCMSIframeReturnValue,
  UseMicroCMSIframePost,
} from './use-microcms-iframe.types'
import { postIframeMessage } from './use-microcms-iframe.utils'

const defaultStyles = { height: 300, width: '100%' } as const

export const useMicroCMSIframe = <T>(
  options?: UseMicroCMSIframeOptions
): UseMicroCMSIframeReturnValue<T> => {
  const [id, setId] = useState('')
  const [origin, setOrigin] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<Message<T>>()
  const [postState, setPostState] = useState<MicroCMSIframePostState<T>>()

  const state = useMemo<UseMicroCMSIframeState<T> | undefined>(() => {
    if (!id || !origin) return
    return {
      id,
      origin,
      user: { email },
      message,
    }
  }, [email, id, message, origin])

  const updateStyleMessage: UpdateStyleMessage = Object.assign(defaultStyles, {
    height: options?.height,
    width: options?.width,
  })

  useEffect(() => {
    const setUpIframe = () => {
      window.addEventListener('message', (e: MicroCMSMessageEvent<T>) => {
        if (e.isTrusted !== true) return

        const origin = options?.origin || e.origin

        if (origin !== e.origin && origin !== '*') return

        switch (e.data.action) {
          case 'MICROCMS_GET_DEFAULT_DATA': {
            setId(e.data.id)
            setOrigin(origin)
            setEmail(e.data.user.email)
            setMessage(e.data.message)

            postIframeMessage('style', updateStyleMessage, e.data.id, origin)
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
    return setUpIframe
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const post = useCallback<UseMicroCMSIframePost>(
    <T>(message: Message<T>): void => {
      if (id !== '' && origin !== '') {
        postIframeMessage('data', message, id, origin)
      }
    },
    [id, origin]
  )

  return {
    state,
    post,
    postState,
  }
}
