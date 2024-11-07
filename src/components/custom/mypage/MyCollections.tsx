import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SlidersHorizontal, FolderPlus } from "lucide-react";
import { StackedAlbums } from "./StackedAlbums";

export function MyCollections() {
  return (
    <div className="w-[calc(100%-20px)]">
      <Tabs defaultValue="saved">
        <TabsList>
          <TabsTrigger value="saved">저장됨</TabsTrigger>
          <TabsTrigger value="created">생성됨</TabsTrigger>
        </TabsList>

        {/* 저장됨 */}
        <TabsContent value="saved">
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

        {/* 생성됨 */}
        <TabsContent value="created"></TabsContent>
      </Tabs>
    </div>
  );
}
