"use client";

import { COLLECTION_DETAIL } from "@/constants/collections";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CollectionDetailPage() {
  const { id } = useParams();

  const { image, user } = COLLECTION_DETAIL;

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const handleChangeLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div>
      {/* 좌측: 이미지, 좋아요, 사진 저장 */}
      <div className="flex flex-col gap-7 w-fit">
        <Image
          className="rounded-xl"
          src={image.imgurl}
          alt={image.title}
          width={image.width}
          height={image.height}
        />
        <div className="flex justify-between mx-2 items-center">
          {/* 좋아요 */}
          <div className="flex gap-2 items-center">
            <button type="button" onClick={handleChangeLike}>
              <Heart
                stroke={!isLiked ? "#F0AECE" : "#EB4FAB"}
                fill={!isLiked ? "none" : "#EB4FAB"}
              />
            </button>
            <p className="font-bold">{image.likes}</p>
          </div>
          {/* 사진 저장 */}
          <Button
            variant={"outline"}
            className="h-12 w-28 border-[3px] border-sub3 rounded-xl font-bold"
          >
            저장하기
          </Button>
        </div>
      </div>
      {/* 우측: 게시자, 사진 설명, 댓글 */}
      <div>
        {/* 게시자 정보 */}
        <div></div>
      </div>
    </div>
  );
}
