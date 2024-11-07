"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyCollectionsTabContent from "./MyCollectionsTabContent";
import React from "react";
import { TTabValue } from "@/typings";

const tabs = [
  {
    value: "saved",
    name: "저장됨",
  },
  {
    value: "created",
    name: "생성됨",
  },
];

export function MyCollections() {
  const [tabvalue, setTabvalue] = React.useState<TTabValue>("saved");
  const handleTabValue = (value: string) => {
    setTabvalue(value as TTabValue);
  };

  return (
    <Tabs
      className="w-[calc(100%-20px)]"
      defaultValue="saved"
      onValueChange={handleTabValue}
    >
      <div className="flex w-full justify-center mb-8">
        <TabsList className="">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.name} value={tab.value}>
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      <MyCollectionsTabContent value={tabvalue} />
    </Tabs>
  );
}
