import React, { useState } from 'react';

import './App.css';
import LocationSearchInput from './components/search'

function App() {

  const [outlet, setOutlet] = useState(null)


  const onOutlet = (e) => setOutlet(e);

  const onApiLoading = () => setOutlet(null)

  return (
    <div className="App">
      <p className="main_title">Find Honest Food outlets</p>
      <LocationSearchInput onOutlet={onOutlet} apiLoading={onApiLoading} />

      { outlet && <div className="outlet">
        <p>Outlet: </p>
        <p className="outlet_name">{outlet}</p>
      </div>}

    </div>
  );
}

export default App;
