import React from "react";
import Button from "../common/Button";
import TabPanel from "./TabPanel";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

const TabArea = () => {
  const router = useRouter();
  return (
    <>
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
              onClick={() => router.push("/add")}
              none
            />
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  label="보드 생성하기"
                  onClick={() => console.log("보드 생성하기")}
                  none
                />
              </DialogTrigger>
              <DialogContent className="space-y-5 [&>button]:hidden">
                <DialogHeader>
                  <DialogTitle className="text-2xl">보드 만들기</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col">
                  <div className="flex-1 space-y-2">
                    <label className="text-sm font-medium" htmlFor="new-board">
                      이름
                    </label>
                    <input
                      type="text"
                      id="new-board"
                      name="new-board"
                      placeholder="보드 이름을 설정해 주세요."
                      className="block w-full border px-4 py-3 rounded-lg text-md text-zinc-700"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button label="게시하기" onClick={() => {}} />
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <TabPanel value="pin" />
        <TabPanel value="board" />
      </Tabs>
    </>
  );
};

export default TabArea;
