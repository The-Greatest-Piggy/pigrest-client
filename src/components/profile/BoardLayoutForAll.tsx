import React from "react";
import Image from "next/image";

// FIXME: 서버에서 받아 온 이미지들로 대체 예정
const totalPins = [
  {
    imgUrl: "/images/test1.jpg",
    title: "test1",
    description: "test1",
  },
  {
    imgUrl: "/images/test2.jpg",
    title: "test2",
    description: "test2",
  },
];

const BoardLayoutForAll = () => {
  const totalLength = totalPins.length;

  // 비어있는 앨범
  const emptyCount = Math.max(0, 4 - totalLength);
  const emptyData = Array(emptyCount)
    .fill(null)
    .map((_, i) => ({
      imgUrl: null,
      title: `empty-${i}`,
      desccription: `empty-${i}`,
    }));

  const combinedData = [...totalPins, ...emptyData];

  return (
    <div className="relative w-60 h-56">
      <div className="relative">
        {combinedData.slice(0, 4).map((info, idx) => (
          <div
            key={`image-${idx}`}
            className={`absolute w-40 h-40 cursor-pointer overflow-hidden rounded-lg
            ${idx === 0 ? "z-50" : ""}
            ${idx === 1 ? "translate-x-[26px] z-40" : ""}
            ${idx === 2 ? "translate-x-[52px] z-30" : ""}
            ${idx === 3 ? "translate-x-[78px] z-20" : ""}
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
        <p className="font-bold text-lg">모든 핀</p>
        <p className="text-sm text-[#757575]">
          핀 <span>{totalLength}</span>개
        </p>
      </div>
    </div>
  );
};

export default BoardLayoutForAll;
