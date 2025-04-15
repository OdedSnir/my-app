import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
export default function Lobby() {
  const [blocks, setBlocks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/codeblocks`)
      .then((res) => res.json())
      .then((data) => setBlocks(data));
  }, []);

  return (
    <div>
      <h1>Choose a codeblock</h1>
      <ul>
        {blocks.map((block, index) => (
          <li
            key={block._id}
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate(`/block/${block._id}`);
            }}
          >
            {block.title}
          </li>
        ))}
      </ul>
      <h2 onClick={() => navigate("/monitor")}>Check Out courrent rooms...</h2>
    </div>
  );
}
