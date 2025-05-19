/** global nav bar */
import React from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "./ProfileAvatar";

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
      <ProfileAvatar />
    </div>
  );
};

export default GNB;
