import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Control Dashboards</h1>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button
          style={{
            padding: '8px 16px',
            cursor: 'pointer',
            border: activeTab === 0 ? '2px solid #0078d7' : '1px solid #ccc',
            background: activeTab === 0 ? '#e6f0ff' : '#fff',
          }}
          onClick={() => setActiveTab(0)}
        >
          Prova
        </button>
        <button
          style={{
            padding: '8px 16px',
            cursor: 'pointer',
            border: activeTab === 1 ? '2px solid #0078d7' : '1px solid #ccc',
            background: activeTab === 1 ? '#e6f0ff' : '#fff',
          }}
          onClick={() => setActiveTab(1)}
        >
          Tab Vuota
        </button>
      </div>

      <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '4px' }}>
        {activeTab === 0 && (
          <div>
            <p>Applicazione Electron con React</p>
            <button onClick={() => setCount(count + 1)}>
              Cliccato {count} volte
            </button>
          </div>
        )}

        {activeTab === 1 && (
          <div>
            <p>Questa è una tab vuota. Aggiungi qui i tuoi componenti.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;