import { useEffect, useState } from "react";

const WS_URL = "ws://localhost:8000/ws/rooms/all";

export default function RoomMonitorPage() {
  const [roomData, setRoomData] = useState({});

  useEffect(() => {
    const socket = new WebSocket(WS_URL);

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
    </div>
  );
}
