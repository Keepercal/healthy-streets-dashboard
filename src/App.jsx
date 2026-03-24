import React from 'react';
import Map from './Map';
import Sidebar from'./Sidebar';

export default function App(){
  return(
    <div className="App">
      <Sidebar />
      <div className="main-content">
        <Map />
      </div>
    </div>
  );
}