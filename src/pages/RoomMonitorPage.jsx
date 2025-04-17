import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import RoomData from "../components/RoomData.jsx";
const WS_URL = import.meta.env.VITE_WS_URL;
const WS_ROOMDATA_URL = `${WS_URL}/rooms/`;

export default function RoomMonitorPage() {
  const [roomData, setRoomData] = useState([]);
  const navigate = useNavigate();
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket(WS_ROOMDATA_URL);

    socketRef.current = socket;

    socket.onopen = () => {
      console.log("📡 Room monitor connected to:", WS_ROOMDATA_URL);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("📩 Live rooms update:", data);
        setRoomData(Object.entries(data));
        console.log("🔄 Updating room data:", Object.entries(data));
      } catch (err) {
        console.error("❌ Failed to parse room data", err);
      }
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h1>Room Monitor</h1>
      <pre style={{ backgroundColor: "#eee", padding: "10px" }}>
        {roomData.map(([id, data]) => (
          <RoomData
            key={id}
            id={id}
            studentCount={data.studentCount}
            code={data.code}
            solved={data.solved}
          />
        ))}
      </pre>
      <h2 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        Back to lobby
      </h2>
    </div>
  );
}
