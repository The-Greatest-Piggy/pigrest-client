"use client";

import { useState } from "react";
import { MasonryInfiniteGrid } from "@egjs/react-infinitegrid";
import Image from "next/image";

export type TGetItems = {
  nextGroupKey: number;
  count: number;
};

function getItems({ nextGroupKey, count }: TGetItems) {
  const nextItems = [];
  const nextKey = nextGroupKey * count;

  for (let i = 0; i < count; i++) {
    nextItems.push({ groupKey: nextGroupKey, key: nextKey + i });
  }
  return nextItems;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Item = ({ num }: any) => {
  return (
    <div className="inline-block w-[280px]">
      <div className="overflow-hidden rounded-xl">
        <Image
          src={`https://naver.github.io/egjs-infinitegrid/assets/image/${
            (num % 33) + 1
          }.jpg`}
          alt="egjs"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default function Home() {
  const [items, setItems] = useState(() =>
    getItems({ nextGroupKey: 0, count: 10 })
  );
  return (
    <div className="w-full">
      <MasonryInfiniteGrid
        align="justify"
        gap={5}
        onRequestAppend={(e) => {
          const nextGroupKey = (+e.groupKey! || 0) + 1;

          setItems([
            ...items,
            ...getItems({ nextGroupKey: nextGroupKey, count: 10 }),
          ]);
        }}
      >
        {items.map((item, idx) => (
          <Item
            data-grid-groupKey={item.groupKey}
            key={`${item.key}-${idx}`}
            num={item.key}
          />
        ))}
      </MasonryInfiniteGrid>
    </div>
  );
}
