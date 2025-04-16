import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

export default function CodeBlockPage() {
  const [blockData, setBlockData] = useState(null);
  const socketRef = useRef(null);
  const { id } = useParams();
  const [code, setCode] = useState("");

  const WS_BLOCK_URL = `${import.meta.env.VITE_WS_URL}/${id}`;
  useEffect(() => {
    const socket = new WebSocket(WS_BLOCK_URL);
    socketRef.current = socket;
    socketRef.current = socket;
    socket.onopen = () => {
      console.log("WebSocket connection established");
    };
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("📩 Received from server:", event.data);
        setBlockData(data);
        setCode(data.code);
      } catch {
        console.log("📩 Received raw code update:", event.data);
        setCode(event.data);
      }
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => {
      socket.close();
    };
  }, [id]);

  if (!blockData) return <div>Loading...</div>;

  const isMentor = blockData.role === "mentor";

  return (
    <div>
      <h1>{isMentor ? "Mentor View" : "Student View"}</h1>
      <h2>{blockData.title}</h2>
      <textarea
        value={code}
        onChange={(e) => {
          const newCode = e.target.value;
          console.log("📝 Sending update:", newCode);
          setCode(newCode);
          if (!isMentor && socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current?.send(JSON.stringify({ type: "code", code: newCode }));
          }
        }}
        readOnly={isMentor}
        style={{ width: "100%", height: "300px", fontFamily: "monospace" }}
      />
    </div>
  );
}
