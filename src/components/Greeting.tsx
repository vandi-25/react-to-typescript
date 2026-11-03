// ===============================================================
// Code 01: Greeting (function component) converted to TypeScript
// ===============================================================
//
// Steps taken:
// 1. Renamed the file from Greeting.jsx to Greeting.tsx.
//    (.tsx = TypeScript + JSX)
// 2. Removed `import React from 'react'`. With the modern JSX
//    setup ("jsx": "react-jsx" in tsconfig), React does not need
//    to be imported just to write JSX.
// 3. Described the props with an interface, so TypeScript knows
//    `name` must be a string.
// 4. Used the interface to type the destructured props.

// Step 3: the shape of the props this component accepts
interface GreetingProps {
  name: string;
}

// Step 4: `{ name }: GreetingProps` means "destructure name from
// props, and props must match GreetingProps"
const Greeting = ({ name }: GreetingProps) => {
  return <div>Hello, {name}!</div>;
};

export default Greeting;

// Now TypeScript catches mistakes before the code runs:
//   <Greeting />              -> error: 'name' is missing
//   <Greeting name={42} />    -> error: number is not a string
