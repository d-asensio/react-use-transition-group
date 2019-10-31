import { renderHook } from '@testing-library/react-hooks';
import { useTransition } from '../hooks';

describe('useTransition', () => {
  it('Renders the initial state according to the `in` prop (true)', () => {
    const { result } = renderHook(() => useTransition(true));

    expect(result.current.state).toBe('entered');
  });

  it('Renders the initial state according to the `in` prop (false)', () => {
    const { result } = renderHook(() => useTransition(false));

    expect(result.current.state).toBe('exited');
  });

  it('Plays enter sequence', async () => {
    const { result, rerender, waitForNextUpdate } = renderHook(
      ({ inProp }) => useTransition(inProp),
      {
        initialProps: { inProp: false },
      }
    );

    expect(result.current.state).toBe('exited');

    rerender({ inProp: true });

    await waitForNextUpdate();
    expect(result.current.state).toBe('entering');

    await waitForNextUpdate();
    expect(result.current.state).toBe('entered');
  });

  it('Plays enter sequence (onMount)', async () => {
    const { result, waitForNextUpdate } = renderHook(
      ({ inProp }) => {
        return useTransition(inProp, {
          transitionOnMount: true,
          timings: {
            enter: [0, 100],
            exit: [0, 100],
          },
        });
      },
      {
        initialProps: { inProp: false },
      }
    );

    expect(result.current.state).toBe('entered');

    await waitForNextUpdate();
    expect(result.current.state).toBe('exiting');

    await waitForNextUpdate();
    expect(result.current.state).toBe('exited');
  });

  it('Plays exit sequence', async () => {
    const { result, rerender, waitForNextUpdate } = renderHook(
      ({ inProp }) => useTransition(inProp),
      {
        initialProps: { inProp: true },
      }
    );

    expect(result.current.state).toBe('entered');

    rerender({ inProp: false });

    await waitForNextUpdate();
    expect(result.current.state).toBe('exiting');

    await waitForNextUpdate();
    expect(result.current.state).toBe('exited');
  });

  it('Plays exit sequence (onMount)', async () => {
    const { result, waitForNextUpdate } = renderHook(
      ({ inProp }) => {
        return useTransition(inProp, {
          transitionOnMount: true,
          timings: {
            enter: [0, 100],
            exit: [0, 100],
          },
        });
      },
      {
        initialProps: { inProp: true },
      }
    );

    expect(result.current.state).toBe('exited');

    await waitForNextUpdate();
    expect(result.current.state).toBe('entering');

    await waitForNextUpdate();
    expect(result.current.state).toBe('entered');
  });

  it('Keeps isMountTransition to `true` during first transition', async () => {
    const { result, waitForNextUpdate, rerender } = renderHook(
      ({ inProp }) => {
        return useTransition(inProp, {
          transitionOnMount: true,
          timings: {
            enter: [0, 100],
            exit: [0, 100],
          },
        });
      },
      {
        initialProps: { inProp: false },
      }
    );

    expect(result.current.isMountTransition).toBe(true);

    await waitForNextUpdate();
    expect(result.current.isMountTransition).toBe(true);

    await waitForNextUpdate();
    expect(result.current.isMountTransition).toBe(true);

    rerender({ inProp: true });

    expect(result.current.isMountTransition).toBe(false);

    await waitForNextUpdate();
    expect(result.current.isMountTransition).toBe(false);

    await waitForNextUpdate();
    expect(result.current.isMountTransition).toBe(false);
  });
});
