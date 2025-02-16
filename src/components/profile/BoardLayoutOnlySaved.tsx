import Image from "next/image";
import React from "react";

interface BoardLayoutOnlySavedProps {
  board: {
    title: string;
    pins: {
      imgUrl: string;
      title: string;
      description: string;
    }[];
    updatedAt: Date;
  };
}

const BoardLayoutOnlySaved: React.FC<BoardLayoutOnlySavedProps> = ({
  board,
}) => {
  const totalLength = board.pins.length;

  // 비어있는 앨범
  const emptyCount = Math.max(0, 3 - totalLength);
  const emptyData = Array(emptyCount)
    .fill(null)
    .map((_, i) => ({
      imgUrl: null,
      title: `empty-${i}`,
      description: `empty-${i}`,
    }));

  const combinedData = [...board.pins, ...emptyData];

  console.log("this", combinedData);
  return (
    <div className="relative w-60 h-56">
      <div className="relative">
        {combinedData.slice(0, 3).map((info, idx) => (
          <div
            key={`image-${idx}`}
            className={`absolute cursor-pointer overflow-hidden
              ${idx === 0 ? "w-40 h-40 rounded-l-lg" : ""}
              ${idx === 1 ? "translate-x-[160px] w-20 h-20 rounded-tr-lg" : ""}
              ${
                idx === 2
                  ? "translate-x-[160px] translate-y-[80px] rounded-br-lg w-20 h-20"
                  : ""
              }
              `}
          >
            {info.imgUrl ? (
              <Image
                src={info.imgUrl}
                alt={info.title}
                fill
                className="object-cover"
              />
            ) : (
              // 이미지 대체
              <div className="absolute inset-0 bg-gray-300/60"></div>
            )}
          </div>
        ))}
      </div>
      <div className="absolute left-0 -bottom-0">
        <p className="font-bold text-lg">{board.title}</p>
        <p className="text-sm text-[#757575]">
          핀 <span>{totalLength}</span>개
        </p>
      </div>
    </div>
  );
};

export default BoardLayoutOnlySaved;
