/** global nav bar */
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { authStore } from "@/stores/authStore";

const GNB = () => {
  return (
    <div className="mb-4 flex items-center justify-between space-x-4">
      {/* logo */}
      <Link href={"/"}>
        <div className="w-16 flex justify-center">
          <Image
            priority
            src={"/images/pigrest_logo.png"}
            width={40}
            height={40}
            alt="logo"
          />
        </div>
      </Link>

      {/* search bar (tbd) */}
      <div className="bg-zinc-200 w-full px-4 py-1.5 rounded-lg">
        search bar
      </div>

      {/* profile avatar */}
      {
        authStore.isAuthenticated ? (
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
            <Link href={"/auth"} className="text-sm bg-pink-300 hover:bg-pink-400 transition-colors duration-500 eaes-in-out p-2 rounded-md">
              로그인
            </Link>
            <Link href={"/auth"} className="text-sm bg-gray-100 hover:bg-gray-200 transition-colors duration-500 ease-in-out p-2 rounded-md">
              회원가입
            </Link>
          </div>
        )
      }

    </div>
  );
};

export default GNB;
