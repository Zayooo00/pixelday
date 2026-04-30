import { useState, useEffect } from "react";

export default function DateDisplay() {
  const [formattedDate, setFormattedDate] = useState("");
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="text-stroke-rose text-center text-4xl font-bold text-white">
      {loading ? (
        <div className="flex justify-center">
          <div className="mt-1 h-8 w-60 animate-pulse bg-gray-300"></div>
        </div>
      ) : (
        formattedDate
      )}
    </h1>
  );
}
