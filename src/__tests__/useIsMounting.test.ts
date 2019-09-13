import { renderHook } from '@testing-library/react-hooks';
import { useIsMounting } from '../hooks/useIsMounting';

describe('useIsMounting', () => {
  const { result, rerender } = renderHook(() => useIsMounting());

  it('Returns `true` on first render', () => {
    expect(result.current).toBe(true);
  });

  it('Returns `false` on subsequent renders', () => {
    rerender();
    expect(result.current).toBe(false);

    rerender();
    expect(result.current).toBe(false);
  });
});
