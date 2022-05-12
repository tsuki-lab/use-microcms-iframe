/**
 * @vitest-environment jsdom
 */
import { act, cleanup, renderHook } from '@testing-library/react-hooks'
import { afterEach, describe, expect, it } from 'vitest'
import { useStateMicroCMSIframe } from './use-state-microcms-iframe'

afterEach(() => cleanup())
describe('useMicroCMSIframe', () => {
  const initialValue = { id: 0, title: '' }

  it('初期値確認', () => {
    const { result } = renderHook(() => useStateMicroCMSIframe(initialValue))
    expect(result.current[0]).toBe(initialValue)
  })

  it('setState動作確認_1', () => {
    const { result } = renderHook(() => useStateMicroCMSIframe(initialValue))
    const updateValue = { id: 1, title: 'updated' }
    act(() => {
      const setState = result.current[1]
      setState(updateValue)
    })
    expect(result.current[0]).toBe(updateValue)
  })

  it('setState動作確認_2', () => {
    const { result } = renderHook(() => useStateMicroCMSIframe(initialValue))
    const updateValue2 = { title: 'updated' }
    act(() => {
      const setState = result.current[1]
      setState((prev) => Object.assign(prev, updateValue2))
    })
    expect(result.current[0]).toBe(Object.assign(initialValue, updateValue2))
  })
})
