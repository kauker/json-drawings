import React from 'react';

import Canvas from './Canvas';

function App() {
  const [jsonData, setJsonData] = React.useState('');

  const [width] = useWindowSize();

  const handleChange = e => {
    const { value } = e.target;
    setJsonData(value);
  }

  return (
    <div className="app">
      <Canvas data={jsonData} width={Math.min(Math.max(width, 500), 1500) - 30}/>
      <textarea
        rows="30"
        value={jsonData}
        onChange={handleChange}
      >
      </textarea>
    </div>
  );
}

export default App;

function useWindowSize() {
  const [size, setSize] = React.useState([0, 0]);
  React.useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}