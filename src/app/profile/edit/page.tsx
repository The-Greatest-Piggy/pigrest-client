"use client";

import Header from "@/components/common/Header";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

const ProfileEdit = () => {
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState(
    "/images/default_avatar.png"
  );
  const [imageFile, setImageFile] = useState<File | null>(null); // 서버로 보낼 파일 데이터

  // 버튼 클릭 시, 인풋을 클릭한 효과를 준다
  const handleImageClick = () => {
    fileInput.current?.click();
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setProfileImage(url); // 화면에 보여줄 이미지
      setImageFile(file); // 서버에 넘겨줄 파일
    }
  };

  const resetImage = () => {
    setProfileImage("/images/default_avatar.png");
    setImageFile(null);
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  console.log(profileImage, imageFile);
  return (
    <div className="space-y-9">
      <Header
        label="프로필 수정"
        showBackArrow
        btnLabel="수정하기"
        btnOnClick={() => router.back()}
      />
      <div className="flex flex-row gap-16 mx-5 max-w-screen-sm">
        <div className="flex-none flex flex-col gap-5 items-center">
          <Image
            src={profileImage}
            width={"240"}
            height={"240"}
            alt="프로필 이미지"
            className="rounded-full border-2 aspect-square object-cover"
          />
          <input
            type="file"
            ref={fileInput} // useRef로 생성한 참조를 연결
            onChange={uploadImage} // 파일 선택 시 실행될 함수
            className="hidden"
            accept="image/*"
          />
          <div className="flex space-x-2 font-medium">
            <button onClick={handleImageClick}>프로필 변경</button>
            <span className="cursor-default">|</span>
            <button onClick={resetImage}>초기화</button>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-8">
          {/* username */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium" htmlFor="username">
              닉네임
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="닉네임을 입력해 주세요."
              className="block w-full border px-4 py-3 rounded-lg text-sm text-zinc-700"
            />
          </div>
          {/* bio */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium" htmlFor="bio">
              소개
            </label>
            <textarea
              name="bio"
              id="bio"
              rows={3}
              maxLength={150}
              placeholder="회원님에 대해 설명해 주세요."
              className="resize-none block w-full border px-4 py-3 rounded-lg text-sm text-zinc-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
