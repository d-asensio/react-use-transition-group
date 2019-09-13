import { renderHook, act } from '@testing-library/react-hooks';
import { useStateSequence } from '../hooks';

describe('useStateSequence', () => {
  it('Renders the initial state', () => {
    const { result } = renderHook(() => useStateSequence('init_state'));

    const initialState = result.current.state;
    expect(initialState).toBe('init_state');
  });

  it('Renders the initial state (passing a function as initial state)', () => {
    const { result } = renderHook(() => useStateSequence(() => 'init_state'));

    const initialState = result.current.state;
    expect(initialState).toBe('init_state');
  });

  it('Plays a state sequence with non-zero timeouts', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useStateSequence('init_state'));

    act(() => {
      result.current.playSequence([['first_state', 100], ['second_state', 100], ['third_state', 100]]);
    });

    await waitForNextUpdate();
    expect(result.current.state).toBe('first_state');

    await waitForNextUpdate();
    expect(result.current.state).toBe('second_state');

    await waitForNextUpdate();
    expect(result.current.state).toBe('third_state');
  });

  it('Plays a state sequence with zeroed timeouts', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useStateSequence('init_state'));

    act(() => {
      result.current.playSequence([['first_state', 0], ['second_state', 0], ['third_state', 0]]);
    });

    await waitForNextUpdate();
    expect(result.current.state).toBe('first_state');

    await waitForNextUpdate();
    expect(result.current.state).toBe('second_state');

    await waitForNextUpdate();
    expect(result.current.state).toBe('third_state');
  });

  it('Enqueue concurrent sequences', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useStateSequence('init_state'));

    act(() => {
      result.current.playSequence([['first_state', 0], ['second_state', 0]]);
      result.current.playSequence([['third_state', 0], ['fourth_state', 0]]);
    });

    (async () => {
      await waitForNextUpdate();
      expect(result.current.state).toBe('first_state');

      await waitForNextUpdate();
      expect(result.current.state).toBe('second_state');

      await waitForNextUpdate();
      expect(result.current.state).toBe('third_state');

      await waitForNextUpdate();
      expect(result.current.state).toBe('fourth_state');
    })();
  });
});
