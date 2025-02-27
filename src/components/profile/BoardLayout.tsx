import React from "react";
import { Board, PUBLIC_STATUS_TYPE } from "@/typings/profile";
import Image from "next/image";

interface BoardLayoutProps {
  board: Board;
  variant: "custom" | "default"; // 레이아웃 구분
}

const BoardLayout: React.FC<BoardLayoutProps> = ({ board, variant }) => {
  const totalLength = board.pins.length;
  const maxImages = variant === "custom" ? 3 : 4;

  // 비어있는 앨범
  const emptyCount = Math.max(0, maxImages - totalLength);
  const emptyData = Array(emptyCount)
    .fill(null)
    .map((_, i) => ({
      imgUrl: null,
      title: `empty-${i}`,
      description: `empty-${i}`,
    }));

  const combinedData = [...board.pins, ...emptyData];
  // 공개 비공개 여부
  const isPublicStatus = PUBLIC_STATUS_TYPE[board.isPublic];

  return (
    <div className="relative w-60 h-56">
      <div className="relative">
        {combinedData.slice(0, maxImages).map((info, idx) => (
          <div
            key={`image-${info.title}`}
            className={`absolute cursor-pointer overflow-hidden
              ${
                variant === "custom" &&
                (idx === 0
                  ? "w-40 h-40 rounded-l-lg"
                  : idx === 1
                  ? "translate-x-[160px] w-20 h-20 rounded-tr-lg"
                  : idx === 2
                  ? "translate-x-[160px] translate-y-[80px] rounded-br-lg w-20 h-20"
                  : "")
              }
              ${
                variant === "default" &&
                `h-40 w-40 rounded-lg ${
                  idx === 0
                    ? "z-50"
                    : idx === 1
                    ? "translate-x-[26px] z-40"
                    : idx === 2
                    ? "translate-x-[52px] z-30"
                    : idx === 3
                    ? "translate-x-[78px] z-20"
                    : ""
                }`
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
      <div className="absolute w-full left-0 -bottom-0">
        <div className="flex items-center justify-between">
          <p className="font-bold text-lg">{board.title}</p>
          <p className="text-sm text-[#3A3A3A]">{isPublicStatus}</p>
        </div>
        <p className="text-sm text-[#757575]">
          핀 <span>{totalLength}</span>개
        </p>
      </div>
    </div>
  );
};

export default BoardLayout;
