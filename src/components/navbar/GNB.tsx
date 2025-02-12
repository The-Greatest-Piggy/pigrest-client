/** global nav bar */
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const GNB = () => {
  return (
    <div className="mb-4 flex items-center justify-between space-x-4">
      {/* logo */}
      <Link href={"/"}>
        <div className="w-16 flex justify-center">
          <Image
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
