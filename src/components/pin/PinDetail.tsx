"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Bookmark, Ellipsis } from "lucide-react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/libs/utils";

type Board = {
  id: number;
  boardName: string;
  isDefault: boolean;
  isSaved: boolean;
};

const PinDetail = () => {
  const [isLiked, setIsLiked] = useState<boolean>(false); // 사용자 좋아요 클릭 여부
  const [totalLikes, setTotalLikes] = useState<number>(12); // 해당 게시물의 총 좋아요 수
  const [boards, setBoards] = useState<Board[]>([
    {
      id: 1,
      boardName: "모든 핀",
      isDefault: true,
      isSaved: true,
    },
    {
      id: 2,
      boardName: "내가만든보드1",
      isDefault: false,
      isSaved: false,
    },
    {
      id: 3,
      boardName: "내가만든보드2",
      isDefault: false,
      isSaved: false,
    },
  ]);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const toggleLike = () => {
    const newState = !isLiked;
    setIsLiked(newState);
    setTotalLikes((prev) => prev + (newState ? 1 : -1));
  };

  const toggleBoardSave = (id: number) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === id ? { ...board, isSaved: !board.isSaved } : board
      )
    );
  };

  const toggleIsFollowing = () => {
    setIsFollowing((prev) => !prev);
  };

  return (
    <div className="flex flex-row gap-16 mx-5 max-w-screen-lg">
      <div className="flex flex-col gap-4">
        <Image
          src={"/images/test7.jpg"}
          alt="detail"
          width={420}
          height={0}
          className="rounded-xl"
        />
        {/* 좋아요 & 저장하기 버튼 */}
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-1">
            {isLiked ? (
              <FaHeart
                size={20}
                onClick={toggleLike}
                className="text-red-500 cursor-pointer"
              />
            ) : (
              <FaRegHeart
                size={20}
                onClick={toggleLike}
                className="text-red-500 cursor-pointer"
              />
            )}
            <span>{totalLikes}</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer flex items-center space-x-1">
                <Bookmark size={20} />
                <span>내 보드에 저장</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>나의 보드</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {boards.map((board) => (
                <DropdownMenuCheckboxItem
                  key={board.id}
                  checked={board.isSaved}
                  onCheckedChange={() => toggleBoardSave(board.id)}
                  disabled={board.isDefault}
                >
                  {board.boardName}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* 핀 상세 정보 */}
      <div className="flex-1">
        {/* 제목 / 수정 및 삭제 dropdown */}
        <div className="flex flex-row items-center justify-between">
          <div className="font-semibold text-2xl">Piggy nose👃🐖</div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer flex items-center space-x-1">
                <Ellipsis color="#000000" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36">
              <DropdownMenuGroup>
                <DropdownMenuItem>수정하기</DropdownMenuItem>
                <DropdownMenuItem>삭제하기</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* 게시자 닉네임 및 팔로우/팔로잉 버튼 */}
        <div className="flex flex-row items-center space-x-5 mt-3">
          <div className="flex flex-row items-center space-x-3">
            <Avatar className="hover:cursor-pointer w-7 h-7 flex items-center justify-center">
              <AvatarImage
                className="rounded-full"
                src="https://github.com/shadcn.png"
                alt="avatar"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="font-medium text-sm">피클 전</p>
          </div>
          {/* 팔로잉 / 팔로우 버튼 */}
          <button
            onClick={toggleIsFollowing}
            className={cn([
              "text-sm font-medium border rounded-lg px-2 py-0.5",
              isFollowing ? "bg-black text-white" : "",
            ])}
          >
            {isFollowing ? "팔로잉" : "팔로우"}
          </button>
        </div>
        {/* 게시글 내용, 수정된 날짜 */}
        <div className="mt-6">
          <p className="h-28">
            메롱 잘해서 기네스북에 오른 얼룩돼지 (앙큼력 최대치) 🐖❤️ 메롱
            잘해서 기네스북에 오른 얼룩돼지 (앙큼력 최대치) 🐖❤️ 메롱 잘해서
            기네스북에 오른 얼룩돼지 (앙큼력 최대치) 🐖❤️ 메롱 잘해서 기네스북에
            오른 얼룩돼지 (앙큼력 최대치) 🐖❤️
          </p>
          <p className="text-[#757575] text-xs">YYYY.MM.DD (수정됨)</p>
        </div>
        {/* TODO: 댓글 */}
      </div>
    </div>
  );
};

export default PinDetail;
