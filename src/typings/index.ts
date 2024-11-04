export type TMockData = {
  id: string;
  imgUrl: string;
  name: string;
};

// 사진 하나 상세 정보
export type TCollectionDetail = {
  image: {
    imgurl: string; // 사진 경로
    width: number; // 사진 너비
    height: number; // 사진 높이
    title: string; // 제목
    description: string; // 설명
    collections: string[]; // 컬렉션
    tags: string[]; // 태그들
    comments: string[]; // 댓글들
    likes: number; // 좋아요 개수
  };
  user: {
    name: string; // 사진을 등록한 사람의 이름
    accounts: string; // 사진 등록한 사람의 아이디
    // 팔로잉, 팔로워 관계
  };
};
