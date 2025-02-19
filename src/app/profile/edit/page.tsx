"use client";

import Header from "@/components/common/Header";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const ProfileEdit = () => {
  const router = useRouter();
  return (
    <div className="space-y-9">
      <Header
        label="프로필 수정"
        showBackArrow
        btnLabel="수정하기"
        btnOnClick={() => router.back()}
      />
      <div className="flex flex-row gap-16 mx-5 max-w-screen-sm">
        <div className="flex-none flex flex-col gap-5">
          <Image
            src={"/images/tester.jpg"}
            width={"160"}
            height={"160"}
            alt="tester"
            className="rounded-full"
          />
          <div className="flex flex-col items-center">
            <p className="text-3xl font-bold mb-1">피클 전</p>
            <p className="text-sm text-[#757575]">@_pickles_the_pig</p>
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
          {/* website */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium" htmlFor="website">
              웹사이트
            </label>
            <input
              type="text"
              id="website"
              name="website"
              placeholder="https://"
              className="block w-full border px-4 py-3 rounded-lg text-sm text-zinc-700"
            />
            <p className="text-xs text-[#757575] font-medium">
              회원님의 사이트로 트래픽을 유도하는 링크를 추가하세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
