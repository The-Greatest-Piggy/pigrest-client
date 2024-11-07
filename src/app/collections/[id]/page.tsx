"use client";

import { COLLECTION_DETAIL } from "@/constants/collections";
import Image from "next/image";
import { Heart, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export default function CollectionDetailPage() {
  const { image, user } = COLLECTION_DETAIL;

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const handleChangeLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="container flex gap-16 w-2/3">
      {/* 좌측: 이미지, 좋아요, 사진 저장 */}
      <div className="flex flex-col items-center w-5/12">
        <div className="space-y-7">
          <Image
            className="rounded-xl"
            src={image.imgurl}
            alt={image.title}
            width={image.width}
            height={image.height}
          />
          <div className="flex justify-between w-full px-2 items-center">
            {/* 좋아요 */}
            <div className="flex gap-2 items-center">
              <button type="button" onClick={handleChangeLike}>
                <Heart
                  stroke={!isLiked ? "#F0AECE" : "#EB4FAB"}
                  fill={!isLiked ? "none" : "#EB4FAB"}
                />
              </button>
              <p className="font-bold">{image.likes}</p>
            </div>
            {/* 사진 저장 */}
            <Button
              variant={"outline"}
              className="h-10 w-28 border-[3px] border-sub3 rounded-xl font-bold"
            >
              저장하기
            </Button>
          </div>
        </div>
      </div>
      {/* 우측: 게시자, 사진 설명, 댓글 */}
      <div className="flex-1 space-y-7">
        {/* 게시자 정보 */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Avatar className="hover:cursor-pointer w-16 h-16">
              <AvatarImage src="https://github.com/shadcn.png" alt="profile" />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-lg">{user.name}</p>
              <p className="text-sm">@{user.accounts}</p>
            </div>
          </div>
          {/* // TODO: 팔로우/팔로잉 기능 */}
          <Button
            variant={"outline"}
            className="h-10 w-28 border-[3px] border-sub3 rounded-xl font-bold"
          >
            팔로우
          </Button>
        </div>
        {/* description */}
        <div className="p-4">
          <p className="whitespace-pre-wrap h-32 overflow-y-auto">
            {image.description}
          </p>
        </div>
        {/* // TODO: 댓글 기능 구현, 컴포넌트 분리 */}
        {/* comments */}
        <div className="flex-col space-y-3">
          <p className="text-base">
            댓글
            <span className="font-bold ml-1">{image.comments.length}</span>개
          </p>
          <div className="flex border rounded-lg items-center">
            <Input
              className="h-10 border-none shadow-none focus:outline-none ring-offset-0 focus-visible:ring-0 focus:ring-0"
              type="text"
              placeholder="내용을 입력해 주세요."
            />
            <Button
              type="submit"
              variant={"ghost"}
              size={"icon"}
              className="mr-1"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
