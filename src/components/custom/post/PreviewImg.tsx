"use client";

import clsx from "clsx";
import Image from "next/image";
import { DragEvent, useEffect, useRef, useState } from "react";
import { CircleArrowDown } from "lucide-react";

export type TInputFile = string | null;

export const PreviewImg = () => {
  const [inputFile, setInputFile] = useState<TInputFile>(null);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const [imageHeight, setImageHeight] = useState<number>(520);

  const fileRef = useRef<HTMLInputElement>(null);

  const handleUploadFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new window.Image();
      img.src = reader.result as string;

      img.onload = () => {
        const aspectRatio = img.height / img.width;
        const calculatedHeight = Math.round(380 * aspectRatio);
        setImageHeight(calculatedHeight);
      };

      setInputFile(reader.result as string);
    };
  };

  const handleFileChange = () => {
    const fileImg = fileRef?.current?.files?.[0];
    if (fileImg) {
      handleUploadFile(fileImg);
    }
  };

  const handleResetFile = () => {
    if (inputFile !== null) {
      setInputFile(null);
      setImageHeight(520);
    }
  };

  const handleDragStart = () => setIsDragActive(true);
  const handleDragEnd = () => setIsDragActive(false);
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleDragEnd();

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      handleUploadFile(droppedFile);
    }
  };

  useEffect(() => {
    console.log(isDragActive);
  }, [isDragActive]);

  return (
    <div className="flex flex-col items-center w-5/12">
      <div
        className={clsx(
          "relative flex flex-col items-center justify-center overflow-hidden bg-sub4 rounded-2xl",
          {
            "bg-[#efeef3] border-dashed border-2 border-font1":
              isDragActive === true,
            "md:w-[380px] md:h-[520px] border-dashed border-2 border-[#B3B3B3]":
              inputFile === null,
            "w-[380px] border-2": inputFile !== null,
          }
        )}
        onDragEnter={handleDragStart}
        onDragOver={handleDragOver}
        onDragLeave={handleDragEnd}
        onDrop={handleDrop}
      >
        <form>
          <label
            htmlFor="inputImg"
            className={
              "flex h-full w-full cursor-pointer flex-col items-center justify-center"
            }
          >
            <div
              className={clsx("flex flex-col items-center space-y-3", {
                hidden: inputFile !== null,
              })}
            >
              <p>
                <CircleArrowDown />
              </p>
              <p className="text-center">
                파일을 선택하거나 여기로
                <br />
                끌어다 놓으세요.
              </p>
            </div>
            {/* 업로드 이미지 미리보기 */}
            {inputFile && (
              <Image
                src={inputFile}
                alt={inputFile}
                width={380}
                height={imageHeight}
                className="w-[380px] h-auto"
              />
            )}
            <input
              id="inputImg"
              className="hidden"
              type="file"
              accept="image/*"
              ref={fileRef}
              onChange={handleFileChange}
            />
          </label>
        </form>
      </div>
      <button type="reset" onClick={handleResetFile} className="mt-4">
        이미지 초기화
      </button>
    </div>
  );
};
