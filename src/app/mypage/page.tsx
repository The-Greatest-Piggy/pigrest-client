import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { COLLECTION_DETAIL } from "@/constants/collections";
import { MyCollections } from "../../components/custom/mypage/MyCollections";

export default function MyPage() {
  const { user } = COLLECTION_DETAIL;
  return (
    <div className="flex flex-col items-center mt-12 space-y-24">
      {/* 유저 정보 */}
      <div className="flex flex-col items-center space-y-4">
        {/* 프로필 사진 */}
        <Avatar className="w-36 h-36">
          <AvatarImage src="pigs/pig2.jpg" alt="profileImg" />
          <AvatarFallback>P</AvatarFallback>
        </Avatar>

        {/* 유저 이름 */}
        <p className="font-bold text-3xl">{user.name}</p>

        {/* 계정명, 팔로워 수 */}
        <div className="flex flex-col items-center">
          <p className="text-font3 text-sm">@{user.accounts}</p>
          {/* // TODO: 팔로잉, 팔로워 */}
          <p className="font-medium text-md">
            친구 <span>{user.friendsList.length}</span>명
          </p>
        </div>

        {/* 공유, 프로필수정 */}
        <div className="space-x-3">
          <Button className="rounded-2xl bg-sub4 text-font1 text-base font-semibold hover:bg-sub3">
            공유
          </Button>
          <Button className="rounded-2xl bg-sub4 text-font1 text-base font-semibold hover:bg-sub3">
            프로필 수정
          </Button>
        </div>
      </div>

      {/* 컬렉션 */}
      <MyCollections />
    </div>
  );
}
