/**
 * side navigation bar
 *
 * home, add, noti, talk
 */

"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SNB() {
  const router = useRouter();
  return (
    <div>
      <div className="flex flex-col w-16 bg-sub2 rounded-lg py-5 gap-2">
        <Button variant="link" onClick={() => router.push("/")}>
          Home
        </Button>
        <Button variant="link" onClick={() => router.push("/post")}>
          Post
        </Button>
        <Button variant="link">Noti</Button>
        <Button variant="link">Talk</Button>
      </div>
    </div>
  );
}
