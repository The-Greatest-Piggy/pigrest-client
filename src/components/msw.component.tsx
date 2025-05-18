"use client";

import { useEffect } from "react";

export const MswComponent = () => {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
      if (typeof window === "undefined") {
        (async () => {
          const { server } = await import("@/mocks/server");
          server.listen();
        })();
      } else {
        (async () => {
          console.log("Start Worker");
          const { worker } = await import("@/mocks/browser");
          worker.start();
        })();
      }
    }
  });

  return null;
};
