"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import Button from "./Button";

interface HeaderProps {
  label?: string;
  showBackArrow?: boolean;
  btnLabel?: string;
  btnOnClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  label,
  showBackArrow,
  btnLabel,
  btnOnClick,
}) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="border-b-[1px] py-2 pb-3 flex justify-between">
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
      {btnLabel && btnOnClick && (
        <Button label={btnLabel} onClick={btnOnClick} />
      )}
    </div>
  );
};

export default Header;
