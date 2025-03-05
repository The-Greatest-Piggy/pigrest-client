import { http, HttpResponse } from "msw";

interface PinData {
  id: string;
  title: string;
  description: string;
  // pinImage: File | null;
  pinImage: string; // base64
  board: string;
  hashtags: string[];
}

const allPins: PinData[] = [
  {
    id: "1",
    title: "test1",
    description: "test des1",
    pinImage: "/images/test5.jpg",
    board: "보드 1",
    hashtags: ["# test1", "# test2"],
  },
  {
    id: "2",
    title: "test2",
    description: "test des2",
    pinImage: "/images/test6.jpg",
    board: "보드 2",
    hashtags: ["# wowwow", "# 오댑악"],
  },
];

export const handlers = [
  http.get("/api/pins", () => {
    return HttpResponse.json(allPins);
  }),

  http.post("/api/upload", async ({ request }) => {
    // pindata type으로 jsonData를 받아준다
    const jsonData = (await request.json()) as PinData;

    const newPin = {
      ...jsonData,
      id: Date.now().toString(),
    };
    allPins.push(newPin);
    return HttpResponse.json(newPin, { status: 201 });
  }),
];
