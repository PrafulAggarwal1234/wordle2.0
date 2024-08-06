import { useEffect, useMemo, useState } from "react";
import {io} from 'socket.io-client';
import { BrowserRouter as Router, Route, Switch, Link, Routes } from 'react-router-dom';
import Wordle from "./components/Wordle";
import Form from "./components/Form";
function App() {
  const [solution,setSolution] =useState(null);
  const [player2,setPlayer2]=useState({'username':'','socket_id':''});
  // const [userName,setUserName] =useState(null);
  // const [userName2,setUserName2] =useState(null);
  const socket= useMemo(() => io("https://wordle-server-ddo7.onrender.com/"), []);
  socket.on("solution-word",(word)=>{
    setSolution(word);
  })
  // useEffect(()=>{
  //   // setUserName(window.prompt('Please your name and click ok to join a room! '));
  //   // socket.emit("username","pappu")
  //   // socket.emit("userjoined","random msg2");
  //   socket.on('connect', () => {
  //     console.log("socket-id: ",socket.id);
  //   });
  //   socket.on("message",(msg)=>{
  //     console.log(`recived msg ${msg}`);
  //   })
  //   fetch('https://api.datamuse.com/words?sp=?????')
  //   .then(res => res.json())
  //   .then(json=>{
  //     let index=Math.floor(Math.random()*json.length);
  //     setSolution(json[index].word);
  //     //we need to select a random element from it, hence we genrate a random int from 0 & n
  //   })
  // },[setSolution])
  console.log(solution);
  return (
    <Router>
    
      {/* Define the routes */}
      <Routes>
        <Route path="/" exact element={<Form socket={socket} setPlayer2={setPlayer2}/>} />
        <Route path="/room/:id/:username" element={solution && <Wordle socket={socket } solution={solution} player2={player2}/>} />
      </Routes>
    
    {/* <div className="App">
      <h1>Wordle</h1>
      <h2>{userName}</h2>
      <h2>{userName2}</h2>
      {solution && <Wordle solution={solution}/>}
    </div> */}
  </Router>
  );
}

export default App;
