import { TCollectionDetail, TMyPageCollections } from "@/typings";

export const COLLECTION_DETAIL: TCollectionDetail = {
  image: {
    imgurl: "https://via.placeholder.com/420x470",
    // imgurl: "/pigs/pig1.jpg",
    width: 418,
    height: 470,
    title: "닦아주고싶은 돼지",
    // description:
    //   "쓱싹",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus arcu eu odio pulvinar congue. Vestibulum quis enim eros. Nunc fringilla, enim molestie aliquam cursus, nibh diam elementum ligula, hendrerit ornare felis odio sit amet ipsum. Mauris bibendum diam risus, sollicitudin euismod magna rhoncus ac. Duis tincidunt aliquet sapien, at ultricies massa sagittis eu. Integer faucibus quam aliquam, ultricies diam in, molestie felis. Nam dapibus tristique pulvinar. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    collections: [],
    tags: ["pig", "cute", "nyam"],
    comments: [],
    likes: 1234,
  },
  user: {
    name: "피클 전",
    accounts: "pickles_the_pig",
    friendsList: ["hehe", "keke"],
  },
};

export const MYPAGE_COLLECTIONS: TMyPageCollections = [
  {
    image: {
      imgurl: "/pigs/pig1.jpg",
      width: 418,
      height: 470,
      title: "닦아주고싶은 돼지",
      description: "쓱싹",
      collections: [],
      tags: ["pig", "cute", "nyam"],
      comments: [],
      likes: 1234,
    },
    user: {
      name: "피클 전",
      accounts: "pickles_the_pig",
      friendsList: ["hehe", "keke"],
    },
  },
  {
    image: {
      imgurl: "/pigs/pig2.jpg",
      width: 418,
      height: 470,
      title: "웃고있엉",
      description: "쓱싹22",
      collections: [],
      tags: ["pig", "cute", "nyam"],
      comments: [],
      likes: 1234,
    },
    user: {
      name: "피클 전",
      accounts: "pickles_the_pig",
      friendsList: ["hehe", "keke"],
    },
  },
  {
    image: {
      imgurl: "/pigs/pig2.jpg",
      width: 418,
      height: 470,
      title: "웃고있엉",
      description: "쓱싹22",
      collections: [],
      tags: ["pig", "cute", "nyam"],
      comments: [],
      likes: 1234,
    },
    user: {
      name: "피클 전",
      accounts: "pickles_the_pig",
      friendsList: ["hehe", "keke"],
    },
  },
];
