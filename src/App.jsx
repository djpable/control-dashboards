import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const rows = 32;
  const cols = 8;
  const totalControls = rows * cols;
  const [controls, setControls] = useState(
    Array.from({ length: totalControls }, () => ({ text: '', status: 'off' }))
  );

  const setControlText = (index, value) =>
    setControls((prev) => prev.map((c, i) => (i === index ? { ...c, text: value } : c)));

  const setControlStatus = (index, status) =>
    setControls((prev) => prev.map((c, i) => (i === index ? { ...c, status } : c)));

  const renderControl = (control, index) => (
    <div
      key={index}
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto auto auto 24px',
        alignItems: 'center',
        gap: '4px',
        padding: '4px',
        border: '1px solid #ddd',
        borderRadius: '4px',
      }}
    >
      <input
        type="text"
        placeholder="...."
        maxLength={4}
        value={control.text}
        style={{ padding: '4px', width: '4ch' }}
        onChange={(e) => setControlText(index, e.target.value)}
      />
      <button onClick={() => setControlStatus(index, 'on')} style={{ padding: '4px 6px' }}>
        On
      </button>
      <button onClick={() => setControlStatus(index, 'off')} style={{ padding: '4px 6px' }}>
        Off
      </button>
      <div
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: control.status === 'on' ? 'green' : 'red',
          border: '1px solid #333',
        }}
        title={control.status === 'on' ? 'Green' : 'Red'}
      />
    </div>
  );

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
          Prova2
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
            <h2>Prova2 - User Controls</h2>
            <p>Ogni controllo ha TextEdit (4 char), On/Off e LED.</p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                gap: '8px',
              }}
            >
              {controls.map(renderControl)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;