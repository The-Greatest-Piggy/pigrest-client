"use client";

import Header from "@/components/common/Header";
import PinComponent from "@/components/pin/PinComponent";
import { Pin } from "@/typings/main";
import React, { useEffect, useState } from "react";

// FIXME: 해당 보드 정보를 조회한다
const Board = () => {
  const [pins, setPins] = useState<Pin[]>([]);

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const res = await fetch(`/api/boards/${"00001"}`);
        if (!res.ok) throw new Error("보드의 핀 목록 불러오기 실패");

        const data = await res.json();
        setPins(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPins();
  }, []);

  return (
    <div className="space-y-9">
      {/* // FIXME: 보드 정보 받아오기 */}
      <Header label="모든 핀" showBackArrow />
      <div className="flex-1 columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-5">
        {pins &&
          pins.map((pin) => (
            <PinComponent
              key={pin.id}
              id={pin.id}
              title={pin.title}
              pinImageUrl={pin.pinImageUrl}
            />
          ))}
      </div>
    </div>
  );
};

export default Board;
