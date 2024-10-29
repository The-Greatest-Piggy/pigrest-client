/**
 * global navigation bar
 *
 * 로고(클릭 시 홈페이지 이동), 서치바(미정, 기획 변경 가능), 프로필(클릭 시 마이페이지 이동)
 */

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function GNB() {
  const router = useRouter();
  return (
    <div className="flex w-full items-center justify-around my-4">
      {/* logo */}
      <Image
        src={"/logo.svg"}
        alt={"logo"}
        width={"36"}
        height={"36"}
        className="hover:cursor-pointer"
        onClick={() => router.push("/")}
      />
      {/* search bar */}
      {/* // FIXME: 진짜 서치바로 할지 아니면 다른걸로 할지 고민 */}
      <Input className="w-[90%]" type="text" placeholder="to be continue.." />
      {/* profile */}
      {/* // FIXME: 로그인이 되어있는 경우 마이페이지로 이동, 안되어있으면 로그인
      페이지로 이동 */}
      <Avatar
        className="hover:cursor-pointer"
        onClick={() => router.push("/mypage")}
      >
        <AvatarImage src="https://github.com/shadcn.png" alt="profileImg" />
        <AvatarFallback>P</AvatarFallback>
      </Avatar>
    </div>
  );
}
