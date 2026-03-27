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

  const updateStatus = (index, status) => {
    setControlStatus(index, status);
    if (window.backend && window.backend.showLedStatus) {
      window.backend.showLedStatus(index, status).then((result) => {
        console.log('Backend returned', result);
      });
    }
  };

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
        style={{ padding: '2px', width: '4ch', fontSize: '12px', marginRight: '0px' }}
        onChange={(e) => setControlText(index, e.target.value)}
      />
      <button onClick={() => updateStatus(index, 'on')} style={{ padding: '4px 6px', fontSize: '11px', marginLeft: '0px' }}>
        On
      </button>
      <button onClick={() => updateStatus(index, 'off')} style={{ padding: '4px 6px' }}>
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
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                gap: '0px',
                padding: '2px',
              }}
            >
              {controls.map((control, index) => (
                <div
                  key={index}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto auto auto 16px',
                    alignItems: 'center',
                    gap: '0px',
                    padding: '2px',
                    border: '1px solid #ddd',
                    borderRadius: '2px',
                  }}
                >
                  <input
                    type="text"
                    placeholder="..."
                    maxLength={4}
                    value={control.text}
                    style={{ padding: '2px', width: '4ch', fontSize: '12px' }}
                    onChange={(e) => setControlText(index, e.target.value)}
                  />
                  <button onClick={() => updateStatus(index, 'on')} style={{ padding: '2px', fontSize: '11px' }}>
                    On
                  </button>
                  <button onClick={() => updateStatus(index, 'off')} style={{ padding: '2px', fontSize: '11px' }}>
                    Off
                  </button>
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: control.status === 'on' ? 'green' : 'red',
                      border: '1px solid #333',
                    }}
                    title={control.status === 'on' ? 'Green' : 'Red'}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;