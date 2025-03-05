"use client";

import Image from "next/image";
/** 이미지 업로드 구현 연습하기 */
import React, { ChangeEvent, FormEvent, useRef, useState } from "react";

const TestUploadImage = () => {
  const [image, setImage] = useState("/images/default_avatar.png"); // 미리보기
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  const imageFile = useRef<File | null>(null); // 업로드할 이미지 파일

  const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    imageFile.current = file; // 파일 저장

    // 이미지 화면에 띄우기 (이미지 미리보기) > base64로 변환
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        setImage(reader.result.toString());
      }
    };
    // reader.onload = async () => {
    //   if (reader.result) {
    //     setImage(reader.result.toString());
    //     // 이미지 파일을 formData에 담아 서버에 보내고, 서버는 받은 이미지 파일을 S3에 저장하고 받은 URL값을 클라이언트로 변환해준다
    //     const formData = new FormData();
    //     formData.append("image", file);
    //     try {
    //       const res = await fetch("/api/test", {
    //         method: "POST",
    //         // headers: { "Content-Type": "multipart/form-data" },
    //         body: formData,
    //       });
    //       const imageData = await res.json();
    //       console.log("post data is...", imageData);
    //     } catch (error) {
    //       console.log("test error: ", error);
    //     }
    //   }
    // };
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!imageFile.current) {
      alert("이미지 업로드 필요");
      return;
    }

    // formData 생성
    const formData = new FormData();
    formData.append("image", imageFile.current);
    formData.append("title", title);
    formData.append("description", description);

    // 서버에 post
    try {
      const res = await fetch("/api/test", {
        method: "POST",
        body: formData,
      });

      const resData = await res.json();
      console.log("uploaded data: ", resData);
    } catch (error) {
      console.log("upload error: ", error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <a href="#" onClick={() => fileInput.current?.click()}>
        <Image src={image} alt="image test" width={150} height={0} />
      </a>

      {/* 이미지 업로드 버튼: 클릭 시 input이 클릭되어야 함 >> htmlFor와 input의 id 동일해야한다 */}
      {/* <label htmlFor="input-file">이미지 선택</label> */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInput}
        onChange={handleChangeImage}
      />

      {/* title */}
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* description */}
      <textarea
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* submit button */}
      <button type="submit">upload</button>
    </form>
  );
};

export default TestUploadImage;
