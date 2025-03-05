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
  // pinImage: File | null;
  pinImage: string; // base64
  board: string;
  hashtags: string[];
}

const Add = () => {
  const router = useRouter();
  const methods = useForm<PinFormProps>({
    defaultValues: {
      title: "",
      description: "",
      pinImage: "",
      board: "",
      hashtags: [],
    },
  });

  const onSubmit = async (data: PinFormProps) => {
    const payload = {
      title: data.title,
      description: data.description,
      pinImage: data.pinImage,
      board: data.board,
      hashtags: data.hashtags,
    };

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      console.log("success: ", resData);
      router.back();
    } catch (error) {
      console.log("error: ", error);
    }
    // // 이미지가 null이거나 파일 객체가 아닌 경우 return
    // if (!(data.pinImage && data.pinImage instanceof File)) return;

    // const formData = new FormData();
    // formData.append("title", data.title);
    // formData.append("description", data.description);
    // formData.append("pinImage", data.pinImage);
    // formData.append("board", data.board);
    // formData.append("hashtags", JSON.stringify(data.hashtags));

    // try {
    //   const res = await fetch("/api/upload", {
    //     method: "POST",
    //     body: formData,
    //   });

    //   const resdata = await res.json();
    //   console.log("success msw: ", resdata);
    //   router.back();
    // } catch (error) {
    //   console.log("error:", error);
    // }
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
