'use client';

import Link from "next/link";
import { authStore } from "@/stores/authStore";
import { observer } from "mobx-react-lite";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const ProfileAvatar = observer(() => {
  return authStore.isAuthenticated ? (
    <Link href={"/profile"}>
      <Avatar className="hover:cursor-pointer w-10 h-10 flex items-center justify-center">
        <AvatarImage
          className="rounded-full"
          src="https://github.com/shadcn.png"
          alt="avatar"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </Link>
  ) : (
    <div className="min-w-max ml-2 flex gap-2">
      <Link href={"/auth?mode=login"} className="text-sm bg-pink-400 hover:bg-pink-600 transition-colors duration-300 ease-in-out p-2 rounded-md font-semibold text-white">
        로그인
      </Link>
      <Link href={"/auth?mode=register"} className="text-sm bg-gray-100 hover:bg-gray-300 transition-colors duration-300 ease-in-out p-2 rounded-md font-semibold">
        회원가입
      </Link>
    </div>
  )
});

export default ProfileAvatar;