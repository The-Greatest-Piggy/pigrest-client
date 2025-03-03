"use client";

// TODO
/**
 * 1. 보드 select component
 * 2. 태그 중복 선택 component
 * 3. 추가 옵션 지금은 없음
 * 4. 이미지 추가 기능 넣기
 */

import Header from "@/components/common/Header";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CircleArrowUp } from "lucide-react";
import React, { useState } from "react";

const Add = () => {
  const [inputTag, setInputTag] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = inputTag.trim();
      if (!trimmed) return;

      const formmattedTag = trimmed.startsWith("#") ? trimmed : `# ${trimmed}`;
      setHashtags((prev) => [...prev, formmattedTag]);
      setInputTag("");
    }
  };

  const handleDeleteTag = (tag: string) => {
    const sortedTags = hashtags.filter((v) => v !== tag);
    setHashtags(sortedTags);
  };

  return (
    <div className="space-y-9">
      <Header
        label="핀 생성"
        showBackArrow
        btnLabel="게시하기"
        btnOnClick={() => {}}
      />
      <div className="flex flex-row gap-16 mx-5 max-w-screen-lg">
        {/* 이미지가 없는 경우 // 이미지가 있는 경우 */}
        <div className="w-96 h-[520px] p-8 bg-[#E9E9E9] rounded-md border-2 border-dashed border-[#B3B3B3] flex flex-col items-center justify-between">
          <div></div>
          <div className="flex flex-col items-center space-y-3">
            <CircleArrowUp />
            <p className="font-medium text-center">
              파일을 선택하거나 여기로 <br /> 끌어다 놓으세요
            </p>
          </div>
          <p className="text-sm text-[#333333]">
            Pigrest는 20MB 미만의 고화질 .jpg 파일 또는 <br /> 200MB 미만의 .mp4
            파일 사용을 권장합니다.
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-8">
          {/* title */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="title">
              제목
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="제목을 입력해주세요."
              className="block w-full border px-4 py-3 rounded-lg text-sm text-zinc-700"
            />
          </div>

          {/* description */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="description">
              설명
            </label>
            <textarea
              id="description"
              name="description"
              rows={6}
              maxLength={200}
              placeholder="설명을 입력해주세요."
              className="resize-none block w-full border px-4 py-3 rounded-lg text-sm text-zinc-700"
            />
          </div>

          {/* board */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="description">
              보드
            </label>
            <Select>
              <SelectTrigger className="w-full h-[46px] rounded-lg text-sm text-zinc-700">
                <SelectValue placeholder="보드를 선택해주세요." />
              </SelectTrigger>
              <SelectContent>
                {/* // FIXME: 내가 가지고 있는 보드들이 option으로 나타나야 한다 */}
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* tags */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="description">
              태그
            </label>
            {/* // TODO: 해시태그 인풋창 + 보여지는 태그들 */}
            <input
              type="text"
              id="hashtags"
              name="hashtags"
              placeholder="태그를 입력해주세요."
              className="block w-full border px-4 py-3 rounded-lg text-sm text-zinc-700"
              value={inputTag}
              onChange={(e) => setInputTag(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="flex flex-wrap gap-2">
              {hashtags.map((tag, idx) => (
                <span
                  className="bg-pink-100 rounded-md px-2 cursor-pointer"
                  key={`tag-${idx}`}
                  onClick={() => handleDeleteTag(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
