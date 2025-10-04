export default function Chat({ text }: { text: string }) {
  return (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        color: "white",
        padding: "20px",
        borderRadius: "10px 10px 0 0",
        fontSize: "18px",
        fontWeight: "500",
        margin: "0 20px 0 20px",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
        maxWidth: "600px",
      }}
    >
      {text}
    </div>
  );
}
