import React, { useCallback } from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { CircleArrowUp } from "lucide-react";

const ImageUploader = () => {
  const { setValue, watch } = useFormContext();
  const pinImage = watch("pinImage");

  // 드래그앤드롭 기능
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          if (reader.result) {
            setValue("pinImage", reader.result.toString());
          }
        };
        // setValue("pinImage", file, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxSize: 20 * 1024 * 1024, // 20MB 제한
  });

  return (
    <div
      {...getRootProps()}
      className={`w-96 cursor-pointer flex flex-col items-center justify-between ${
        pinImage ? "h-fit" : "h-[520px] border-2 border-dashed rounded-md p-8"
      } 
      ${
        isDragActive
          ? "border-blue-500 bg-blue-100"
          : "border-gray-300 bg-gray-100"
      }`}
    >
      <input {...getInputProps()} />
      {pinImage ? (
        <Image
          src={pinImage}
          alt="새로운 핀 이미지"
          width={0}
          height={0}
          style={{ width: "384px", height: "auto" }}
          className="rounded-md object-cover"
        />
      ) : (
        <>
          <div></div>
          <div className="flex flex-col items-center space-y-3">
            <CircleArrowUp />
            <p className="font-medium text-center">
              파일을 선택하거나 여기로 <br /> 끌어다 놓으세요
            </p>
          </div>
          <p className="text-sm text-[#333333]">
            Pigrest는 20MB 미만의 고화질 .jpg 파일 또는 <br /> 200MB 미만의 .mp4
            파일 사용을 권장합니다.
          </p>
        </>
      )}
    </div>
  );
};

export default ImageUploader;
