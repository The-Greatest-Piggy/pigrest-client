"use client";

import { Input } from "@/components/ui/input";
import { Cat, Dog, Fish, Rabbit, Turtle } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { MultiSelect } from "@/components/ui/multi-select";

const frameworksList = [
  { value: "react", label: "React", icon: Turtle },
  { value: "angular", label: "Angular", icon: Cat },
  { value: "vue", label: "Vue", icon: Dog },
  { value: "svelte", label: "Svelte", icon: Rabbit },
  { value: "ember", label: "Ember", icon: Fish },
];

export default function PreviewImgInfo() {
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([
    "react",
    "angular",
  ]);

  return (
    <div className="flex flex-col w-2/3 space-y-5">
      {/* title */}
      <div>
        <p>제목</p>
        <Input
          className="h-10 w-2/3 rounded-xl"
          type="text"
          placeholder="제목을 입력해 주세요."
        />
      </div>
      {/* description */}
      <div>
        <p>설명</p>
        <Textarea
          className="w-2/3 rounded-xl"
          placeholder="돼지를 설명해 주세요."
        />
      </div>
      {/* collections */}
      <div>
        <p>컬렉션</p>
        <Select>
          <SelectTrigger className="h-10 w-2/3 rounded-xl">
            <SelectValue placeholder="컬렉션을 선택해 주세요." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* tags */}
      <div>
        <p>
          태그 <span></span>개 선택
        </p>
        <div className="p-4 max-w-xl">
          <MultiSelect
            options={frameworksList}
            onValueChange={setSelectedFrameworks}
            defaultValue={selectedFrameworks}
            placeholder="Select frameworks"
            variant="inverted"
            animation={2}
            maxCount={3}
          />
          <div className="mt-4">
            <ul className="list-disc list-inside">
              {selectedFrameworks.map((framework) => (
                <li key={framework}>{framework}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
