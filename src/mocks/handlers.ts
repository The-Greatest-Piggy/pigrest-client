import { http, HttpResponse } from "msw";

interface PinData {
  id: string;
  title: string;
  description: string;
  pinImageUrl: string; // url
  board: string;
  hashtags: string[];
}

const allPins: PinData[] = [
  {
    id: "1",
    title: "test1",
    description: "test des1",
    pinImageUrl: "/images/test5.jpg",
    board: "보드 1",
    hashtags: ["# test1", "# test2"],
  },
  {
    id: "2",
    title: "👁🫦👁",
    description: "test des2",
    pinImageUrl: "/images/test6.jpg",
    board: "보드 2",
    hashtags: ["# wowwow", "# 오댑악"],
  },
  {
    id: "3",
    title: "test3",
    description: "test des3",
    pinImageUrl: "/images/test1.jpg",
    board: "보드 1",
    hashtags: ["# test1", "# test2"],
  },
  {
    id: "4",
    title: "test4",
    description: "test des4",
    pinImageUrl: "/images/test2.jpg",
    board: "보드 1",
    hashtags: ["# wowwow", "# 오댑악"],
  },
  {
    id: "5",
    title: "test5",
    description: "test des5",
    pinImageUrl: "/images/test3.jpg",
    board: "보드 1",
    hashtags: ["# test5", "# test2"],
  },
  {
    id: "6",
    title: "test6",
    description: "test des6",
    pinImageUrl: "/images/tester.jpg",
    board: "보드 1",
    hashtags: ["# wowwow", "# 오댑악"],
  },
  {
    id: "7",
    title: "test7",
    description: "test des7",
    pinImageUrl: "/images/test7.jpg",
    board: "보드 2",
    hashtags: ["# test7", "# test2"],
  },
  {
    id: "8",
    title: "test8",
    description: "test des8",
    pinImageUrl: "/images/test8.jpg",
    board: "보드 2",
    hashtags: ["# wowwow", "# 오댑악"],
  },
  {
    id: "9",
    title: "❤️❤️",
    description: "test des9",
    pinImageUrl: "/images/test9.jpg",
    board: "보드 2",
    hashtags: ["# 꽥꽥", "# 히히히"],
  },
  {
    id: "10",
    title: "test10",
    description: "test des10",
    pinImageUrl: "/images/test10.jpg",
    board: "보드 1",
    hashtags: ["# duck", "# 오댑악"],
  },
];

/**
 * 특정 보드 선택했을 때, 해당 보드의 핀 목록
 */
const boardPins: PinData[] = [
  {
    id: "1",
    title: "test1",
    description: "test des1",
    pinImageUrl: "/images/test5.jpg",
    board: "보드 1",
    hashtags: ["# test1", "# test2"],
  },
  {
    id: "2",
    title: "👁🫦👁",
    description: "test des2",
    pinImageUrl: "/images/test6.jpg",
    board: "보드 2",
    hashtags: ["# wowwow", "# 오댑악"],
  },
  {
    id: "3",
    title: "test3",
    description: "test des3",
    pinImageUrl: "/images/test1.jpg",
    board: "보드 1",
    hashtags: ["# test1", "# test2"],
  },
  {
    id: "4",
    title: "test4",
    description: "test des4",
    pinImageUrl: "/images/test2.jpg",
    board: "보드 1",
    hashtags: ["# wowwow", "# 오댑악"],
  },
  {
    id: "5",
    title: "test5",
    description: "test des5",
    pinImageUrl: "/images/test3.jpg",
    board: "보드 1",
    hashtags: ["# test5", "# test2"],
  },
  {
    id: "6",
    title: "test6",
    description: "test des6",
    pinImageUrl: "/images/tester.jpg",
    board: "보드 1",
    hashtags: ["# wowwow", "# 오댑악"],
  },
  {
    id: "7",
    title: "test7",
    description: "test des7",
    pinImageUrl: "/images/test7.jpg",
    board: "보드 2",
    hashtags: ["# test7", "# test2"],
  },
  {
    id: "8",
    title: "test8",
    description: "test des8",
    pinImageUrl: "/images/test8.jpg",
    board: "보드 2",
    hashtags: ["# wowwow", "# 오댑악"],
  },
  {
    id: "9",
    title: "❤️❤️",
    description: "test des9",
    pinImageUrl: "/images/test9.jpg",
    board: "보드 2",
    hashtags: ["# 꽥꽥", "# 히히히"],
  },
  {
    id: "10",
    title: "test10",
    description: "test des10",
    pinImageUrl: "/images/test10.jpg",
    board: "보드 1",
    hashtags: ["# duck", "# 오댑악"],
  },
];

export const handlers = [
  http.get("/api/pins", () => {
    return HttpResponse.json(allPins);
  }),

  http.get("/api/boards/:id", ({ params }) => {
    console.log(`${params.id}보드의 핀 목록 조회`);
    return HttpResponse.json(boardPins);
  }),

  http.post("/api/upload/pin", async ({ request }) => {
    const formData = await request.formData();
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const pinImageUrl = formData.get("pinImageUrl");
    const board = formData.get("board")?.toString();
    const hashtags = formData.get("hashtags")?.toString();

    console.log("????", pinImageUrl, typeof pinImageUrl);
    // 이미지 없거나 File타입이 아닌 경우 Error
    if (!pinImageUrl || !(pinImageUrl instanceof File)) {
      return HttpResponse.json(
        { error: "no image file provided" },
        { status: 400 }
      );
    }

    const newPinData = {
      id: Date.now().toString(),
      filename: pinImageUrl.name,
      type: pinImageUrl.type,
      size: pinImageUrl.size,
      title,
      description,
      board,
      hashtags,
    };

    return HttpResponse.json(newPinData, { status: 201 });
  }),

  http.post("/api/upload/profile", async ({ request }) => {
    const formData = await request.formData();
    const profileImage = formData.get("profileImage");
    const username = formData.get("username")?.toString();
    const bio = formData.get("bio")?.toString();

    // 이미지 없거나 File 타입이 아닌 경우 Error
    if (!profileImage || !(profileImage instanceof File)) {
      return HttpResponse.json(
        { error: "no image file provided" },
        { status: 400 }
      );
    }

    const newProfileData = {
      id: Date.now().toString(),
      filename: profileImage.name,
      type: profileImage.type,
      size: profileImage.size,
      username,
      bio,
    };

    return HttpResponse.json(newProfileData, { status: 201 });
  }),

  http.post("/api/test", async ({ request }) => {
    const formData = await request.formData();
    const img = formData.get("image");
    const title = formData.get("title")?.toString() || "untitled";
    const description = formData.get("description")?.toString() || "";

    // 이미지가 없거나 File 타입이 아닌 경우 에러
    if (!img || !(img instanceof File)) {
      return HttpResponse.json(
        { error: "no image file provided" },
        { status: 400 }
      );
    }

    const newImageData = {
      id: Date.now().toString(),
      filename: img.name,
      type: img.type,
      size: img.size,
      title,
      description,
    };

    console.log("msw test image data: ", newImageData);
    return HttpResponse.json(newImageData, { status: 201 });
  }),
];
