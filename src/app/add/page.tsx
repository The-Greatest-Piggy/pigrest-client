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
  pinImage: null | string;
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
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);

    // TODO: api 호출 > formData 전송
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
