import "./RoomData.css";
export default function RoomData({ id, studentCount, code, sovled }) {
  return (
    <div
      className="room-data"
      style={{ border: "1px solid black", padding: "10px", margin: "10px" }}
    >
      <h2>Room ID: {id}</h2>
      <p>Student Count: {studentCount}</p>
      <p>Code: {code}</p>
      <p>Solved: {sovled ? "Yes" : "No"}</p>
    </div>
  );
}
