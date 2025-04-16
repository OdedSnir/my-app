import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"; 
import { useNavigate } from "react-router-dom";


export default function CodeBlockPage() {
  const [blockData, setBlockData] = useState(null);
  const socketRef = useRef(null);
  const { id } = useParams();
  const [code, setCode] = useState("");
  const [isSolved, setIsSolved] = useState(false);
  const navigate = useNavigate();

  const WS_BLOCK_URL = `${import.meta.env.VITE_WS_URL}/${id}`;

  useEffect(() => {
    const socket = new WebSocket(WS_BLOCK_URL);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "finished") {
          console.log("✅ Problem finished:", data.message);
          setIsSolved(true);

          setTimeout(() => {
            navigate("/");
          }, 5000);
          return;
        }
        console.log("📩 Received from server:", data);
        setBlockData(data);
        setCode(data.code);

        if (typeof data.solved !== "undefined") {
          console.log("✅ Solved from server:", data.solved);
          setIsSolved(data.solved);
        }
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

      {isSolved && (
        <h1 style={{ color: "green" }}>
          😁 Solved! Redirecting to lobby in 5 seconds...
        </h1>
      )}

      <Editor
        value={code}
        onValueChange={(newCode) => {
          console.log("📝 Sending update:", newCode);

          if (
            !isMentor &&
            socketRef.current?.readyState === WebSocket.OPEN &&
            !isSolved
          ) {
            setCode(newCode);
            socketRef.current.send(
              JSON.stringify({ type: "code", code: newCode })
            );
          }
        }}
        highlight={(code) =>
          Prism.highlight(code, Prism.languages.javascript, "javascript")
        }
        padding={10}
        disabled={isMentor}
        style={{
          fontFamily: "monospace",
          fontSize: 14,
          backgroundColor: "#2d2d2d", // Matches prism-tomorrow
          color: "#f8f8f2", // Light text
          borderRadius: "8px",
          border: "1px solid #555",
          height: "300px", // Fixed height
          overflow: "auto", // Enable scrollbars if needed
          caretColor: "#f8f8f2", // 👈 Makes the cursor visible in dark mode
        }}
      />
    </div>
  );
}
