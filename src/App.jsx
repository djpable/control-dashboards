import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Control Dashboards</h1>
      <p>Applicazione Electron con React</p>
      <button onClick={() => setCount(count + 1)}>
        Cliccato {count} volte
      </button>
    </div>
  );
}

export default App;