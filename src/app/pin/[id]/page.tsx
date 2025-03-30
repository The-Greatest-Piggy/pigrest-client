import Header from "@/components/common/Header";
import PinDetail from "@/components/pin/PinDetail";
import React from "react";

const Pin = () => {
  return (
    <div className="space-y-9">
      <Header label="핀 상세" showBackArrow />
      <PinDetail />
    </div>
  );
};

export default Pin;
