import { PreviewImg } from "@/components/custom/post/PreviewImg";
import PreviewImgInfo from "@/components/custom/post/PreviewImgInfo";

export default function PostPage() {
  return (
    <div className="container flex gap-14 w-2/3">
      <PreviewImg />
      <PreviewImgInfo />
    </div>
  );
}
