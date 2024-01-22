import { useState, useEffect } from "react";

export default function DateDisplay() {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      let date = new Date();
      setFormattedDate(
        date
          .toLocaleString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
          .replace(",", ""),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="text-stroke-rose text-center text-4xl font-bold text-white">
      {formattedDate}
    </h1>
  );
}
