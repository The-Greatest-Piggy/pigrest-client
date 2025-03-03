"use client";

import React, { useState } from "react";
import Button from "../common/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RadioGroup from "../common/Radio";

const CreateBoardDialog = () => {
  const [isPublic, setIsPublic] = useState<"public" | "private">("public"); // defualt는 전체공개(public)

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
        <div className="flex flex-col gap-6">
          {/* board name */}
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium" htmlFor="new-board-name">
              이름
            </label>
            <input
              type="text"
              id="new-board-name"
              name="new-board-name"
              placeholder="보드 이름을 설정해 주세요."
              className="block w-full border px-4 py-3 rounded-lg text-md text-zinc-700"
            />
          </div>

          {/* public/private radio btns */}
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium" htmlFor="new-board-ispublic">
              공개 여부
            </label>
            {/* radio group */}
            <RadioGroup
              name="ispublic"
              options={[
                {
                  id: "public",
                  value: "public",
                  label: "공개",
                },
                {
                  id: "private",
                  value: "private",
                  label: "비공개",
                },
              ]}
              selectedValue={isPublic}
              onChange={(value) => setIsPublic(value as "public" | "private")}
              className="flex flex-row gap-20"
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
