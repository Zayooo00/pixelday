import { useState, useEffect } from "react";

export default function DateDisplay() {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      let date = new Date();
      let day = (date.getDate() < 10 ? "0" : "") + date.getDate();
      let month = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
      let year = date.getFullYear();
      let hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
      let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
      setFormattedDate(`${year}-${month}-${day} ${hours}:${minutes}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="text-4xl font-bold text-white text-center text-stroke-rose">
      {formattedDate}
    </h1>
  );
}
