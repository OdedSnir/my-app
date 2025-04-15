import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const WS_URL = import.meta.env.VITE_WS_URL;
const WS_ROOMDATA_URL = `${WS_URL}/rooms/all`;

export default function RoomMonitorPage() {
  const [roomData, setRoomData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const socket = new WebSocket(WS_ROOMDATA_URL);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setRoomData(data);
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
        {JSON.stringify(roomData, null, 2)}
      </pre>
      <h2 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        Back to lobby
      </h2>
    </div>
  );
}
