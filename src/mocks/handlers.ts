import { http, HttpResponse } from "msw";

interface PinData {
  id: string;
  title: string;
  description: string;
  // pinImage: File | null;
  pinImage: string; // url
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

  // http.post("/api/upload", async ({ request }) => {
  //   // pindata type으로 jsonData를 받아준다
  //   const jsonData = (await request.json()) as PinData;

  //   const newPin = {
  //     ...jsonData,
  //     id: Date.now().toString(),
  //   };
  //   allPins.push(newPin);
  //   return HttpResponse.json(newPin, { status: 201 });
  // }),

  http.post("/api/upload/pin", async ({ request }) => {
    const formData = await request.formData();
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const pinImage = formData.get("pinImage");
    const board = formData.get("board")?.toString();
    const hashtags = formData.get("hashtags")?.toString();

    console.log("????", pinImage, typeof pinImage);
    // 이미지 없거나 File타입이 아닌 경우 Error
    if (!pinImage || !(pinImage instanceof File)) {
      return HttpResponse.json(
        { error: "no image file provided" },
        { status: 400 }
      );
    }

    const newPinData = {
      id: Date.now().toString(),
      filename: pinImage.name,
      type: pinImage.type,
      size: pinImage.size,
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
