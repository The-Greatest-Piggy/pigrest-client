"use client";

import Header from "@/components/common/Header";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";
import { useProfileStore } from "@/stores/ProfileStore";

interface ProfileFormProps {
  username: string;
  bio: string | null;
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
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormProps>({
    defaultValues: {
      username: profileStore.username,
      bio: profileStore.bio,
      profileImage: profileStore.profileImage,
    },
  });

  // const profileImage = watch("profileImage");

  // 버튼 클릭 시, 인풋을 클릭한 효과를 준다
  const handleImageClick = () => {
    fileInput.current?.click();
  };

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setImageFile(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        profileStore.setProfileImage(reader.result.toString());
        setValue("profileImage", reader.result.toString());
      }
    };
  };

  const resetImage = async () => {
    try {
      const res = await fetch("/images/default_avatar.png");
      const blob = await res.blob();
      const defaultFile = new File([blob], "default_avatar.png", {
        type: "image/*",
      });

      profileStore.setProfileImage("/images/default_avatar.png");
      setImageFile(defaultFile);
    } catch (error) {
      console.log("Error fetching default profile image: ", error);
    }

    if (fileInput.current) fileInput.current.value = "";
  };

  // const resetImage = () => {
  //   profileStore.setProfileImage("/images/default_avatar.png");
  //   setValue("profileImage", "/images/default_avatar.png");
  //   // default 이미지로 대체한다

  //   // setImageFile(new File([], "default_avatar.png", { type: "image/png" }));
  //   if (fileInput.current) {
  //     fileInput.current.value = "";
  //   }
  //   console.log(
  //     "reset된 이미지: ",
  //     imageFile?.name,
  //     imageFile?.size,
  //     imageFile?.type
  //   );
  // };

  const onSubmit = async (data: ProfileFormProps) => {
    // formData 생성
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("bio", data.bio || "");

    if (imageFile && imageFile.size > 0) {
      // 프로필 이미지를 변경했거나, 기본 이미지인 경우
      formData.append("profileImage", imageFile);
    } else {
      const imageRes = await fetch(profileStore.profileImage);
      const blob = await imageRes.blob();
      const imageFile = new File([blob], "default_profile.png", {
        type: "image/*",
      });

      setImageFile(imageFile);
    }
    // if (imageFile) {
    //   formData.append("profileImage", imageFile);
    // } else {
    //   formData.append("profileImage", profileStore.profileImage);
    // }

    try {
      const res = await fetch("/api/upload/profile", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload profile");
      }

      const data = await res.json();
      console.log("Profile updated successfully: ", data);

      profileStore.setUsername(data.username);
      profileStore.setBio(data.bio);
      profileStore.setProfileImage(data.profileImage);

      router.back();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
    // if (!imageFile) return;

    // // formData 생성
    // const formData = new FormData();
    // formData.append("username", data.username);
    // formData.append("bio", data.bio === null ? "" : data.bio);
    // formData.append("profileImage", imageFile);

    // // 서버에 post
    // try {
    //   const res = await fetch("/api/upload/profile", {
    //     method: "POST",
    //     body: formData,
    //   });
    //   const data = await res.json();
    //   console.log("success to upload profile: ", data);

    //   // update mobx
    //   profileStore.setUsername(data.username);
    //   profileStore.setBio(data.bio);
    //   profileStore.setProfileImage(profileImage);

    //   router.back();
    // } catch (error) {
    //   console.log("failed to upload profile: ", error);
    // }
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
