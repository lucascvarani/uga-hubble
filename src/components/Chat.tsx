export default function Chat({ text }: { text: string }) {
  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      {text}
    </div>
  );
}
