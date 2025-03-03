import React from "react";
import { Tabs } from "@radix-ui/react-tabs";
import TabContent from "./TabContent";
import TabNavigation from "./TabNavigation";
import TabActionButtons from "./TabActionButtons";

const TabArea = () => {
  return (
    <>
      <Tabs defaultValue="pin" className="flex flex-col h-full space-y-8">
        <div className="flex flex-row justify-between">
          <TabNavigation />
          <TabActionButtons />
        </div>
        <TabContent />
      </Tabs>
    </>
  );
};

export default TabArea;
