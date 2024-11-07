import { Card } from "@/components/ui/card";
import { MYPAGE_COLLECTIONS } from "@/constants/collections";
import Image from "next/image";

// FIXME: 저장날짜 내림차순으로 정렬해서 보여줄 수 있도록 해야함
export function StackedAlbums() {
  const data = MYPAGE_COLLECTIONS;

  const currentCount = data.length; // 가지고 있는 사진 개수
  const emptyCount = Math.max(0, 4 - currentCount); // 비어있는 앨범 필요한 개수

  const emptyData = Array(emptyCount)
    .fill(null)
    .map((_, idx) => ({
      image: {
        imgurl: "https://via.placeholder.com/420x470",
        title: `empty-${idx}`,
      },
    }));

  const combinedData = [...data, ...emptyData];

  return (
    <div className="relative pb-10">
      <div className="relative h-40">
        {combinedData.slice(0, 4).map((info, idx) => (
          <Card
            key={`image-${idx}`}
            className={`absolute w-40 h-40 cursor-pointer overflow-hidden
                ${idx === 0 ? "z-50" : ""}
                ${idx === 1 ? "translate-x-[30px] z-40" : ""}
                ${idx === 2 ? "translate-x-[60px] z-30" : ""}
                ${idx === 3 ? "translate-x-[90px] z-20" : ""}
                `}
          >
            <Image
              src={info.image.imgurl}
              alt={info.image.title}
              fill
              className="object-cover"
            />
            {idx > currentCount && (
              <div className="absolute inset-0 bg-gray-100/80 flex items-center justify-center"></div>
            )}
          </Card>
        ))}
      </div>
      <div className="absolute left-0 -bottom-8">
        <p className="font-bold text-2xl">모든 돼지</p>
        <p>
          핀 <span>{currentCount}</span>개
        </p>
      </div>
    </div>
  );
}
