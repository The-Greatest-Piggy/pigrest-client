"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";
import Header from "@/components/common/Header";
import { useProfileStore } from "@/stores/ProfileStore";

interface ProfileFormProps {
  username: string;
  bio: string;
  profileImage: string;
}

const ProfileEdit = observer(() => {
  const router = useRouter();
  const profileStore = useProfileStore();
  const fileInput = useRef<HTMLInputElement>(null); // input요소 직접 접근
  const [imageFile, setImageFile] = useState<File | null>(null); // 서버로 보낼 파일 데이터

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormProps>({
    defaultValues: {
      username: profileStore.username,
      bio: profileStore.bio || "",
      profileImage: profileStore.profileImage,
    },
  });

  // 버튼 클릭 시, 인풋을 클릭한 효과를 준다
  const handleImageClick = () => {
    fileInput.current?.click();
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setImageFile(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        setValue("profileImage", reader.result.toString());
        profileStore.setProfileImage(reader.result.toString());
      }
    };
  };

  const resetImage = () => {
    setValue("profileImage", "/images/default_avatar.png");
    profileStore.setProfileImage("/images/default_avatar.png");
    setImageFile(null);
    if (fileInput.current) fileInput.current.value = "";
  };

  // string 타입을 File 타입으로 변환해주기 (프로필 사진이 안바뀐경우/초기화된 경우)
  const convertToFile = async (image: string): Promise<File> => {
    const response = await fetch(image); // fetch image data
    const blob = await response.blob(); // convert res to blob
    const filename = image.split("/").pop() || "profileImage"; // extract filename
    const file = new File([blob], filename, { type: blob.type }); // create file object from blob
    return file;
  };

  const onSubmit = async (data: ProfileFormProps) => {
    // formData 생성
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("bio", data.bio);
    if (imageFile) {
      formData.append("profileImage", imageFile);
    } else {
      const imageFile = await convertToFile(profileStore.profileImage);
      formData.append("profileImage", imageFile);
    }

    // 서버에 post 요청 보내기
    try {
      const res = await fetch("/api/upload/profile", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("profile updated successfully: ", data);

      profileStore.setUsername(data.username);
      profileStore.setBio(data.bio);
      profileStore.setProfileImage(profileStore.profileImage);
      router.back();
    } catch (error) {
      console.log("failed to upload profile: ", error);
    }
  };

  return (
    <div className="space-y-9">
      <Header
        label="프로필 수정"
        showBackArrow
        btnLabel="수정하기"
        btnOnClick={handleSubmit(onSubmit)}
      />
      <div className="flex flex-row gap-16 mx-5 max-w-screen-md">
        <div className="flex-none flex flex-col gap-5 items-center">
          <Image
            src={profileStore.profileImage}
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
            <label className="text-sm font-medium" htmlFor="username">
              닉네임
            </label>
            <input
              {...register("username", {
                required: "닉네임을 입력해주세요.",
                minLength: {
                  value: 4,
                  message: "닉네임은 4자 이상 12자 이하로 입력해주세요.",
                },
                maxLength: {
                  value: 12,
                  message: "닉네임은 4자 이상 12자 이하로 입력해주세요.",
                },
                pattern: {
                  value: /^[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ_]+$/,
                  message:
                    "닉네임은 한글, 영문 소문자, 숫자, 특수문자(_)로만 구성해야 합니다.",
                },
              })}
              type="text"
              id="username"
              name="username"
              placeholder="닉네임을 입력해주세요."
              className="block w-full border px-4 py-3 rounded-lg text-sm text-zinc-700"
            />
            {errors.username && (
              <span className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </span>
            )}
          </div>
          {/* bio */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="bio">
              소개
            </label>
            <textarea
              {...register("bio")}
              name="bio"
              id="bio"
              rows={3}
              maxLength={100}
              placeholder="회원님에 대해 설명해 주세요."
              className="resize-none block w-full border px-4 py-3 rounded-lg text-sm text-zinc-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProfileEdit;
