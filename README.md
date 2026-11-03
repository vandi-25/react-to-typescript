# Converting React Components to TypeScript

Two React components (a function component and a class component) converted from JavaScript to TypeScript.

- `src/components/Greeting.tsx`: Code 01
- `src/components/Counter.tsx`: Code 02
- `src/App.tsx`: shows both components

Each file has comments explaining every step.

## Run it

```
npm install
npm run dev
```

Then open http://localhost:5173. `npm run build` runs the TypeScript checker (`tsc`) before building.

---

## Code 01: Greeting

**Before (JavaScript)**
```jsx
import React from 'react';
const Greeting = ({ name }) => {
  return <div>Hello, {name}!</div>;
};
export default Greeting;
```

**After (TypeScript)**
```tsx
interface GreetingProps {
  name: string;
}

const Greeting = ({ name }: GreetingProps) => {
  return <div>Hello, {name}!</div>;
};

export default Greeting;
```

**Steps**
1. Renamed `Greeting.jsx` to `Greeting.tsx`. `.tsx` is used for TypeScript files that contain JSX.
2. Removed `import React from 'react'`. With the modern JSX setting (`"jsx": "react-jsx"` in `tsconfig`), React doesn't need to be imported to write JSX.
3. Created an interface, `GreetingProps`, describing the props: `name` must be a `string`.
4. Typed the destructured props: `({ name }: GreetingProps)`.

**What TypeScript now catches**
- `<Greeting />`: error, `name` is missing.
- `<Greeting name={42} />`: error, a number is not a string.

---

## Code 02: Counter

**Before (JavaScript)**
```jsx
import React, { Component } from 'react';
class Counter extends Component {
  state = { count: 0 };
  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };
  render() {
    return
    ( <div>
      <p>Count: {this.state.count}</p>
      <button onClick={this.increment}>Increment</button>
    </div> );
  }
}
export default Counter;
```

**After (TypeScript)**
```tsx
import { Component } from 'react';

interface CounterState {
  count: number;
}

class Counter extends Component<{}, CounterState> {
  state: CounterState = {
    count: 0,
  };

  increment = (): void => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default Counter;
```

**Steps**
1. Renamed `Counter.jsx` to `Counter.tsx`.
2. Kept only `Component` in the import. `React` isn't needed for JSX.
3. Created an interface, `CounterState`, describing the state: `count` is a `number`.
4. Passed the types to `Component<Props, State>`. The counter has no props, so props is `{}` and state is `CounterState`.
5. Typed the `state` property as `CounterState`.
6. Gave `increment` the return type `void`, because it doesn't return anything.
7. **Fixed a bug in the original code.** `return` was alone on its line, with the `(` on the next line. JavaScript automatically ends the statement after `return`, so `render()` returned nothing and the counter never appeared. The `(` now sits on the same line as `return`.

**What TypeScript now catches**
- `this.setState({ count: 'one' })`: error, a string is not a number.
- `this.setState({ total: 1 })`: error, `total` is not part of `CounterState`.

---

## Summary of the conversion process

1. Rename `.jsx` files to `.tsx`.
2. Describe **props** with an `interface` and use it on the component's parameters.
3. For class components, describe **state** with an `interface` and pass it as `Component<Props, State>`.
4. Add types to properties and to function return values where helpful (e.g. `void`).
5. Run the TypeScript checker (`npm run build`, which runs `tsc`) and fix any errors it reports.
