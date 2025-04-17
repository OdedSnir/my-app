import { useState } from "react";
import Lobby from "./pages/Lobby";
import CodeBlockPage from "./pages/CodeBlockPage";
import RoomMonitorPage from "./pages/RoomMonitorPage"; // if you created this
import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/" element={<Lobby />} />
      <Route path="/block/:id" element={<CodeBlockPage />} />
      <Route path="/monitor" element={<RoomMonitorPage />} />
    </Routes>
  );
}

export default App;
