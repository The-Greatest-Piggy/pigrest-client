import { TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import React from "react";

const TabNavigation = () => {
  return (
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
  );
};

export default TabNavigation;
