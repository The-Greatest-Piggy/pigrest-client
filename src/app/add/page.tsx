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
  board: string;
}

const Add = () => {
  const router = useRouter();
  const methods = useForm<PinFormProps>({
    defaultValues: {
      title: "",
      description: "",
      pinImage: null,
    },
  });

  const onSubmit = async (data: PinFormProps) => {
    // 이미지가 null이거나 파일 객체가 아닌 경우 return
    if (!(data.pinImage && data.pinImage instanceof File)) return;

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("board", data.board);
    formData.append("pinImage", data.pinImage);

    router.back();
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
