import Greeting from './components/Greeting';
import Counter from './components/Counter';

function App() {
  return (
    <div className="app">
      <h1>React + TypeScript</h1>
      <Greeting name="Israel" />
      <Counter />
    </div>
  );
}

export default App;
