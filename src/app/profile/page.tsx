"use client";

import React from "react";
import Image from "next/image";
import Button from "@/components/common/Button";
import TabArea from "@/components/profile/TabArea";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import { useProfileStore } from "@/stores/ProfileStore";

const Profile = observer(() => {
  const router = useRouter();
  const profileStore = useProfileStore();

  const handleShare = () => {
    console.log("click");
  };
  const handleEditProfile = () => {
    router.push("/profile/edit");
  };

  return (
    <div className="flex flex-col h-full space-y-8">
      <div className="flex-none flex flex-col items-center justify-center gap-5 mt-12">
        {/* profile image */}
        <Image
          src={profileStore.profileImage}
          width={"160"}
          height={"160"}
          alt="profile image"
          className="rounded-full aspect-square object-cover"
        />
        {/* infos: username / userId / followers / followings */}
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center mb-4">
            <p className="text-3xl font-bold">{profileStore.username}</p>
            <p className="text-[#333333]">{profileStore.bio}</p>
          </div>
          <p className="text-sm text-[#757575]">@{profileStore.userId}</p>
          <div className="flex gap-1 font-semibold">
            <p>팔로워 {profileStore.followers}</p>
            <span>·</span>
            <p>팔로잉 {profileStore.followings}</p>
          </div>
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
});

export default Profile;
