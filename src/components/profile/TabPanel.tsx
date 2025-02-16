import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";
import BoardLayoutForAll from "./BoardLayoutForAll";
import BoardLayoutOnlySaved from "./BoardLayoutOnlySaved";

interface TabPanelProps {
  value: "pin" | "board";
}

interface TestProps {
  height: string;
  text: string;
}

const TestBox: React.FC<TestProps> = ({ height, text }) => {
  return (
    <div
      className={`${height} bg-zinc-300 inline-block w-full break-inside-avoid mb-5 rounded-lg`}
    >
      {text}
    </div>
  );
};

const boardInfos = [
  {
    title: "보드1",
    pins: [
      {
        imgUrl: "/images/test6.jpg",
        title: "test6",
        description: "test6",
      },
      {
        imgUrl: "/images/test5.jpg",
        title: "test5",
        description: "test5",
      },
    ],
    updatedAt: new Date(),
  },
  {
    title: "보드2",
    pins: [
      {
        imgUrl: "/images/test7.jpg",
        title: "test7",
        description: "test7",
      },
      {
        imgUrl: "/images/test8.jpg",
        title: "test8",
        description: "test8",
      },
      {
        imgUrl: "/images/test4.png",
        title: "test4",
        description: "test4",
      },
    ],
    updatedAt: new Date(),
  },
];

const TabPanel: React.FC<TabPanelProps> = ({ value }) => {
  if (value === "pin") {
    return (
      <TabsContent
        value="pin"
        className="flex-1 columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-5"
      >
        <TestBox height="h-[250px]" text="1" />
        <TestBox height="h-[120px]" text="2" />
        <TestBox height="h-[180px]" text="3" />
        <TestBox height="h-[130px]" text="4" />
        <TestBox height="h-[270px]" text="5" />
        <TestBox height="h-[320px]" text="6" />
        <TestBox height="h-[110px]" text="7" />
        <TestBox height="h-[190px]" text="8" />
        <TestBox height="h-[210px]" text="9" />
        <TestBox height="h-[80px]" text="10" />
        <TestBox height="h-[220px]" text="11" />
        <TestBox height="h-[210px]" text="12" />
        <TestBox height="h-[100px]" text="13" />
        <TestBox height="h-[160px]" text="14" />
        <TestBox height="h-[190px]" text="15" />
        <TestBox height="h-[320px]" text="16" />
      </TabsContent>
    );
  }

  if (value === "board") {
    return (
      <TabsContent value="board" className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-8">
          {/* default */}
          <BoardLayoutForAll />
          {boardInfos.map((board, idx) => (
            <BoardLayoutOnlySaved key={idx} board={board} />
          ))}
        </div>
      </TabsContent>
    );
  }
};

export default TabPanel;
