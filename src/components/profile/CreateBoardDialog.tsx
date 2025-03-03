import React from "react";
import Button from "../common/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CreateBoardDialog = () => {
  return (
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
  );
};

export default CreateBoardDialog;
