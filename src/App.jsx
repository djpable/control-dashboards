import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Control Dashboards</h1>
      <Tabs>
        <TabList>
          <Tab>Prova</Tab>
          <Tab>Tab Vuota</Tab>
        </TabList>

        <TabPanel>
          <p>Applicazione Electron con React</p>
          <button onClick={() => setCount(count + 1)}>
            Cliccato {count} volte
          </button>
        </TabPanel>
        <TabPanel>
          {/* Tab vuota */}
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default App;