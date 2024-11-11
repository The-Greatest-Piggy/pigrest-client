"use client";

import React from "react";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CollectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };
  return (
    <section className="pb-10">
      <div className="py-4">
        <button
          type="button"
          className="flex items-center gap-2"
          onClick={handleClick}
        >
          <ArrowLeft />
          <p className="font-semibold text-xl">돼지 생성하기</p>
        </button>
        <hr className="mt-5 mb-8 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
      </div>
      {children}
    </section>
  );
}
