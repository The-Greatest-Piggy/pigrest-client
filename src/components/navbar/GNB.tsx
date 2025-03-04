/** global nav bar */
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

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
    </div>
  );
};

export default GNB;
