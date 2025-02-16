"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

interface HeaderProps {
  label?: string;
  showBackArrow?: boolean;
}

const Header: React.FC<HeaderProps> = ({ label, showBackArrow }) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="border-b-[1px] p-5">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <ArrowLeft
            onClick={handleBack}
            color="black"
            size={20}
            className="cursor-pointer"
          />
        )}
        <h1 className="text-xl font-semibold">{label}</h1>
      </div>
    </div>
  );
};

export default Header;
