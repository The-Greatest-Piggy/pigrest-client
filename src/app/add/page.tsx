"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import Header from "@/components/common/Header";
import ImageUploader from "@/components/add/ImageUploader";
import PinForm from "@/components/add/PinForm";

interface PinFormProps {
  title: string;
  description: string;
  pinImage: File | null;
  // pinImage: string; // base64
  board: string;
  hashtags: string[];
}

const Add = () => {
  const router = useRouter();
  const methods = useForm<PinFormProps>({
    defaultValues: {
      title: "",
      description: "",
      pinImage: null,
      board: "",
      hashtags: [],
    },
  });

  const onSubmit = async (data: PinFormProps) => {
    if (!data.pinImage) return;

    // formData 작성
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("pinImage", data.pinImage);
    formData.append("board", data.board);
    formData.append("hashtags", JSON.stringify(data.hashtags));

    // 서버에 post
    try {
      const res = await fetch("/api/upload/pin", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("success to upload pin: ", data);
      router.back();
    } catch (error) {
      console.log("failed to upload pin: ", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="space-y-9">
        <Header
          label="핀 생성"
          showBackArrow
          btnLabel="게시하기"
          btnOnClick={methods.handleSubmit(onSubmit)}
        />
        <div className="flex flex-row gap-16 mx-5 max-w-screen-lg">
          <ImageUploader />
          <PinForm />
        </div>
      </div>
    </FormProvider>
  );
};

export default Add;
