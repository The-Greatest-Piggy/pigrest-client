import React from "react";
import Button from "../common/Button";
import { useRouter } from "next/navigation";
import CreateBoardDialog from "./CreateBoardDialog";

const TabActionButtons = () => {
  const router = useRouter();
  return (
    <div className="space-x-2">
      <Button label="핀 생성하기" onClick={() => router.push("/add")} none />
      <CreateBoardDialog />
    </div>
  );
};

export default TabActionButtons;
