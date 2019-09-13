# react-use-transition-group

> __Note:__ This is a work in progress repository, no version of it have been released to npm yet. If you want to contribute with the development of this, open an issue.

A react hook and HOC to manage transitions easily.

## Installation

You can install this package using either [yarn](https://yarnpkg.com) or [npm](https://www.npmjs.com/)

```bash
# Yarn installation command
yarn add react-use-transition-group

# NPM installation command
npm i react-use-transition-group --save
```

## API

### `useTransition()`

The `useTransition()` hook helps you with transition states management.

#### Example

```javascript
import { useTransition } from 'react-use-transition-group'

function Fade ({ in: inProp }) {
  const [ trState, trFirstMount ] = useTransition(inProp,
    {
      duration: 300,
      delay: 100
    }
  )

  // Unmount the component on exit
  if (trState === 'exited') return null

  return (
    <div style={{
      width: 300,
      height: 300,
      background: 'plum',
      transition: 'opacity 300ms ease-in-out',
      opacity: {
        entering: 1,
        entered: 1,
        exiting: 0
      }[trState]
    }}>
      {children}
    </div>
  )
}
```

### Interface draft

#### Definition

```ts
type Timings {
  enter: number[],
  exit: number[],
}

type TransitionOptions {
  transitionOnMount?: boolean,
  timings?: Timings,
  mountTimings?: Timings
}

type TransitionHookOutput {
  state: string,
  isMounting: boolean,
  endTransition: () => void
}

function useTransition (
  inProp: boolean,
  options: TransitionOptions
): TransitionHookOutput {}

function useTransitionEffect (
  effect: () => void,
  triggerState: string | string[],
  currentState: string
) {}
```

#### Usage example

```javascript
import { useTransition, useTransitionEffect } from 'react-use-transition-group'

const { state, isMounting, endTransition } = useTransition(
  inProp,
  {
    transitionOnMount: false,
    timings: {
      enter: [0, 300],
      exit: [0, 300]
    },
    mountTimings: {
      enter: [0, 300],
      exit: [0, 300]
    }
  }
)

useTransitionEffect(() => {
  console.log('The transition exited')
}, 'exited', state)

useTransitionEffect(() => {
  console.log('The transition exited or entered')
}, ['exited', 'entered'], state)
```


# Draft

```javascript
const [ state, play ] = useTimerStates({
  exited: 0,
  entering: 300,
  entered: 0,
  exiting: 300
})
```