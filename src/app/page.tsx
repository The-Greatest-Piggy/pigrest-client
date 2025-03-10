"use client";

import { useEffect, useState } from "react";
import { Pin } from "@/typings/main";
import PinComponent from "@/components/pin/PinComponent";

export default function Home() {
  const [allPin, setAllPin] = useState<Pin[]>([]);

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const res = await fetch("/api/pins");
        if (!res.ok) throw new Error("핀 목록 불러오기 실패");

        const data = await res.json();
        setAllPin(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPins();
  }, []);

  return (
    <div className="flex-1 columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-5">
      {allPin.map((pin) => (
        <PinComponent
          key={pin.id}
          id={pin.id}
          title={pin.title}
          pinImageUrl={pin.pinImageUrl}
        />
      ))}
    </div>
  );
}
