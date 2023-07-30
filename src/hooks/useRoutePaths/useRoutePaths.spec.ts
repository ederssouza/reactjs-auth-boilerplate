import { renderHook } from '@testing-library/react'
import { paths } from '@/router'
import useRoutePaths from './useRoutePaths'

describe('useRoutePaths | hook | integration test', () => {
  it('should return paths object', () => {
    const { result } = renderHook(useRoutePaths)

    expect(result.current).toEqual(expect.objectContaining({ ...paths }))
  })
})
