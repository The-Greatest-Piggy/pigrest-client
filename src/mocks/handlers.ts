import { http, HttpResponse } from "msw";

const allPosts = new Map();

export const handlers = [
  http.get("/api/pins", () => {
    return HttpResponse.json(Array.from(allPosts.values()));
  }),

  http.post("/api/upload", async ({ request }) => {
    const formData = await request.formData(); // formdata 형식으로 데이터 받기

    const parsedData = Object.fromEntries(formData.entries());
    console.log("msw에서 받은 formdata: ", parsedData);
    allPosts.set("123", parsedData);

    return HttpResponse.json(parsedData, { status: 201 });
  }),
];
