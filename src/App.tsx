import React from 'react';
import AddToDo from './component/addToDo';
import './App.css';
import Func from './component/func';
import Navbar from './component/navbar';



function App() {
  return (
    <main>
      <h1>React+Typescript</h1>
       <Navbar/>
      <AddToDo/>
      <Func/>
    </main>
  );
}

export default App;
