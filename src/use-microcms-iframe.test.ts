/**
 * @vitest-environment jsdom
 */
import { act, cleanup, renderHook } from '@testing-library/react-hooks'
import { afterEach, describe, expect, it } from 'vitest'
import { useMicroCMSIframe } from './use-microcms-iframe'

afterEach(() => cleanup())
describe('useMicroCMSIframe', () => {
  const initialValue = { text: '' }

  it('初期値確認', () => {
    const { result } = renderHook(() => useMicroCMSIframe(initialValue))
    expect(result.current[0]).toBe(initialValue)
  })

  it('setState動作確認', () => {
    const { result } = renderHook(() => useMicroCMSIframe(initialValue))
    const updateValue = { text: 'updated' }
    act(() => {
      const setState = result.current[1]
      setState(updateValue)
    })
    expect(result.current[0]).toBe(updateValue)
  })
})
