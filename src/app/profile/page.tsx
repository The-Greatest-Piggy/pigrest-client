"use client";

import React from "react";

import Image from "next/image";
import Button from "@/components/common/Button";
import TabArea from "@/components/profile/TabArea";

const Profile = () => {
  const userData = {
    username: "피클_전",
    userId: "_pickles_the_pig",
    friends: 16,
  };

  const handleShare = () => {
    console.log("click");
  };
  const handleEditProfile = () => {
    console.log("click");
  };

  return (
    <div className="flex flex-col h-full space-y-8">
      <div className="flex-none flex flex-col items-center justify-center gap-5 mt-12">
        {/* profile image */}
        <Image
          src={"/images/tester.jpg"}
          width={"160"}
          height={"160"}
          alt="tester"
          className="rounded-full"
        />
        {/* infos: username / userId / friends */}
        <div className="flex flex-col items-center">
          <p className="text-3xl font-bold mb-4">{userData.username}</p>
          <p className="text-sm text-[#757575]">@{userData.userId}</p>
          <div className="font-semibold">프렌즈 {userData.friends}명</div>
        </div>
        {/* buttons */}
        <div className="space-x-2">
          <Button label="공유" secondary onClick={handleShare} />
          <Button label="프로필 수정" secondary onClick={handleEditProfile} />
        </div>
      </div>
      <div className="flex-1">
        <TabArea />
      </div>
    </div>
  );
};

export default Profile;
