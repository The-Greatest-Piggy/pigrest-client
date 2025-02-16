import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import React from "react";
import Button from "../common/Button";
import TabPanel from "./TabPanel";

const TabArea = () => {
  return (
    <Tabs defaultValue="pin" className="flex flex-col h-full space-y-8">
      <div className="flex flex-row justify-between">
        <TabsList className="space-x-2">
          <TabsTrigger
            value="pin"
            className="relative border-b-2 border-b-transparent bg-transparent px-4 pb-1 pt-2 font-semibold text-muted-foreground shadow-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            핀
          </TabsTrigger>
          <TabsTrigger
            value="board"
            className="relative border-b-2 border-b-transparent bg-transparent px-2 pb-1 pt-2 font-semibold text-muted-foreground shadow-none focus-visible:ring-0 data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            보드
          </TabsTrigger>
        </TabsList>
        <div className="space-x-2">
          <Button
            label="핀 생성하기"
            onClick={() => console.log("핀 생성하기")}
            none
          />
          <Button
            label="보드 생성하기"
            onClick={() => console.log("보드 생성하기")}
            none
          />
        </div>
      </div>
      <TabPanel value="pin" />
      <TabPanel value="board" />
    </Tabs>
  );
};

export default TabArea;
