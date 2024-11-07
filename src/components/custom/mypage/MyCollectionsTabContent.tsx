import { TabsContent } from "@/components/ui/tabs";
import { TTabValue } from "@/typings";
import { FolderPlus, SlidersHorizontal } from "lucide-react";
import { StackedAlbums } from "./StackedAlbums";

export default function MyCollectionsTabContent({
  value,
}: {
  value: TTabValue;
}) {
  return (
    <>
      {value === "saved" && (
        <TabsContent value={value} className="space-y-4">
          {/* 필터, 새 컬렉션 생성 */}
          <div className="flex items-center justify-between">
            <button>
              <SlidersHorizontal />
            </button>
            <button>
              <FolderPlus />
            </button>
          </div>
          {/* 컬렉션들 */}
          <div>
            <StackedAlbums />
          </div>
        </TabsContent>
      )}
      {/* // TODO: 내가 생성한 게시물들이 있는 곳 */}
      {value === "created" && <TabsContent value={value}></TabsContent>}
    </>
  );
}
