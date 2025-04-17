import "./RoomData.css";
export default function RoomData({ id, studentCount, code, sovled: solved }) {
  return (
    <div
      className="room-data"
    >
      <h2>Room ID: {id}</h2>
      <p>Student Count: {studentCount}</p>
      <p>Code: {code}</p>
      <p>Solved: {solved ? "Yes" : "No"}</p>
    </div>
  );
}
