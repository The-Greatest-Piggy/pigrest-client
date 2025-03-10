"use client";

import { TabsContent } from "@radix-ui/react-tabs";
import React, { useEffect, useState } from "react";
import { Board } from "@/typings/profile";
import BoardLayout from "./BoardLayout";
import PinComponent from "../pin/PinComponent";
import { Pin } from "@/typings/main";

interface TabPanelProps {
  value: "pin" | "board";
}

// FIXME: 서버에서 받아 온 이미지들로 대체 예정
const defaultBoardInfos: Board[] = [
  {
    title: "모든 핀",
    isPublic: "DEFAULT",
    pins: [
      {
        id: "1",
        pinImageUrl: "/images/test1.jpg",
        title: "test1",
        description: "test1",
        board: "모든 핀",
        hashtags: ["# hash1", "# test 1"],
      },
      {
        id: "2",
        pinImageUrl: "/images/test2.jpg",
        title: "test2",
        description: "test2",
        board: "모든 핀",
        hashtags: ["# hash1", "# test 1"],
      },
      {
        id: "3",
        pinImageUrl: "/images/test3.jpg",
        title: "test3",
        description: "test3",
        board: "모든 핀",
        hashtags: ["# hash1", "# test 1"],
      },
    ],
    updatedAt: new Date(),
  },
  {
    title: "나의 좋아요",
    isPublic: "DEFAULT",
    pins: [
      {
        id: "4",
        pinImageUrl: "/images/test3.jpg",
        title: "test3",
        description: "test3",
        board: "나의 좋아요",
        hashtags: ["# hash1", "# test 1"],
      },
      {
        id: "5",
        pinImageUrl: "/images/test6.jpg",
        title: "test6",
        description: "test6",
        board: "나의 좋아요",
        hashtags: ["# hash1", "# test 1"],
      },
    ],
    updatedAt: new Date(),
  },
];

const customBoardInfos: Board[] = [
  {
    title: "내가만든보드1",
    isPublic: "PUBLIC",
    pins: [
      {
        id: "6",
        pinImageUrl: "/images/test6.jpg",
        title: "test6",
        description: "test6",
        board: "내가만든보드1",
        hashtags: ["# hash1", "# test 1"],
      },
      {
        id: "7",
        pinImageUrl: "/images/test5.jpg",
        title: "test5",
        description: "test5",
        board: "내가만든보드1",
        hashtags: ["# hash1", "# test 1"],
      },
    ],
    updatedAt: new Date(),
  },
  {
    title: "내가만든보드2",
    isPublic: "PRIVATE",
    pins: [
      {
        id: "8",
        pinImageUrl: "/images/test7.jpg",
        title: "test7",
        description: "test7",
        board: "내가만든보드2",
        hashtags: ["# hash1", "# test 1"],
      },
      {
        id: "9",
        pinImageUrl: "/images/test8.jpg",
        title: "test8",
        description: "test8",
        board: "내가만든보드2",
        hashtags: ["# hash1", "# test 1"],
      },
      {
        id: "10",
        pinImageUrl: "/images/test4.png",
        title: "test4",
        description: "test4",
        board: "내가만든보드2",
        hashtags: ["# hash1", "# test 1"],
      },
    ],
    updatedAt: new Date(),
  },
];

const TabPanel: React.FC<TabPanelProps> = ({ value }) => {
  const [allPin, setAllPin] = useState<Pin[]>([]);

  useEffect(() => {
    const fetchPins = async () => {
      try {
        // FIXME: 지금 메인페이지 핀 불러오기랑 같은 API를 사용하고 있음
        // FIXME: 내가 저장한/만든 핀만 불러오는 API로 수정 필요!
        const res = await fetch("/api/pins");
        if (!res.ok) throw new Error("핀 목록 불러오기 실패");

        const data = await res.json();
        setAllPin(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPins();
  });

  if (value === "pin") {
    return (
      <TabsContent
        value="pin"
        className="flex-1 columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-5"
      >
        {allPin.map((pin) => (
          <PinComponent
            key={pin.id}
            id={pin.id}
            title={pin.title}
            pinImageUrl={pin.pinImageUrl}
          />
        ))}
      </TabsContent>
    );
  }

  if (value === "board") {
    return (
      <TabsContent value="board" className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-8">
          {/* default boards: 모든 돼지, 나의 좋아요  */}
          {defaultBoardInfos.map((board) => (
            <BoardLayout
              key={`default-${board.title}`}
              board={board}
              variant="default"
            />
          ))}
          {/* custom boards: 내가 추가로 만든 보드들 */}
          {customBoardInfos.map((board) => (
            <BoardLayout
              key={`custom-${board.title}`}
              board={board}
              variant="custom"
            />
          ))}
        </div>
      </TabsContent>
    );
  }
};

export default TabPanel;
