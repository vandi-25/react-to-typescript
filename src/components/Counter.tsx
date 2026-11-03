// ===============================================================
// Code 02: Counter (class component) converted to TypeScript
// ===============================================================
//
// Steps taken:
// 1. Renamed the file from Counter.jsx to Counter.tsx.
// 2. Kept only `Component` in the import. React itself is not
//    needed for JSX (same reason as in Greeting.tsx).
// 3. Described the state with an interface (CounterState).
// 4. Passed two types to Component: Component<Props, State>.
//    The counter has no props, so props is an empty object {}.
// 5. Typed the `state` property with CounterState.
// 6. Gave increment a return type of `void` (it returns nothing).
// 7. Fixed a bug from the original code: `return` was alone on its
//    line, so JavaScript ended the statement there and render()
//    returned nothing. The `(` must be on the same line as `return`.

import { Component } from 'react';

// Step 3: the shape of this component's state
interface CounterState {
  count: number;
}

// Step 4: Component<props type, state type>
class Counter extends Component<{}, CounterState> {
  // Step 5: TypeScript checks the initial state matches CounterState
  state: CounterState = {
    count: 0,
  };

  // Step 6: arrow function keeps `this` pointing at the component
  increment = (): void => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    // Step 7: `(` on the same line as `return`
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default Counter;

// Now TypeScript catches mistakes like:
//   this.setState({ count: 'one' })  -> error: string is not a number
//   this.setState({ total: 1 })      -> error: 'total' is not in CounterState
