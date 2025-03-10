import { Pin } from "@/typings/main";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const PinComponent: React.FC<
  Omit<Pin, "description" | "board" | "hashtags">
> = ({ id, title, pinImageUrl }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/pin/${id}`)}
      className="mb-5 inline-block cursor-pointer"
    >
      <Image
        src={pinImageUrl}
        alt={title}
        width={500}
        height={0}
        className="rounded-xl"
        objectFit="cover"
      />
      <p className="text-sm font-semibold pl-2 pt-1">{title}</p>
    </div>
  );
};

export default PinComponent;
