import React, { useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PinForm = () => {
  const {
    control,
    setValue,
    register,
    formState: { errors },
  } = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null); // useRef로 불필요한 리렌더링(인풋에 값 입력할때마다 렌더링되는 이슈) 방지
  const [hashtags, setHashtags] = useState<string[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== "Enter") return;
    e.preventDefault();

    const trimmed = inputRef.current?.value.trim();
    if (!trimmed) return;

    // 중복검사
    const formmattedTag = trimmed.startsWith("#") ? trimmed : `# ${trimmed}`;
    if (
      hashtags.some((tag) => tag.toLowerCase() === formmattedTag.toLowerCase())
    )
      return;

    const newHashtags = [...hashtags, formmattedTag];
    setHashtags(newHashtags);
    setValue("hashtags", newHashtags);

    // 직접 입력값 초기화
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleDeleteTag = (tag: string) => {
    const sortedTags = hashtags.filter((v) => v !== tag);
    setHashtags(sortedTags);
    setValue("hashtags", sortedTags);
  };

  return (
    <div className="flex flex-1 flex-col gap-8">
      {/* title */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" htmlFor="title">
          제목
        </label>
        <input
          type="text"
          id="title"
          {...register("title", { required: "제목은 필수 입력 항목입니다." })}
          placeholder="제목을 입력해주세요."
          className="block w-full border px-4 py-3 rounded-lg text-sm text-zinc-700"
        />
        {errors.title && (
          <span className="text-red-500 text-xs mt-1">
            {errors.title.message as string}
          </span>
        )}
      </div>
      {/* description */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" htmlFor="description">
          설명
        </label>
        <textarea
          id="description"
          {...register("description")}
          rows={6}
          maxLength={200}
          placeholder="설명을 입력해주세요."
          className="resize-none block w-full border px-4 py-3 rounded-lg text-sm text-zinc-700"
        />
      </div>

      {/* board */}
      <Controller
        control={control}
        name="board"
        rules={{ required: "보드는 필수 선택 항목입니다." }}
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="description">
              보드
            </label>
            <Select onValueChange={field.onChange} {...field}>
              <SelectTrigger className="w-full h-[46px] rounded-lg text-sm text-zinc-700 shadow-none">
                <SelectValue placeholder="보드를 선택해주세요." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>내 보드</SelectLabel>
                  <SelectItem value="board1">보드 1</SelectItem>
                  <SelectItem value="board2">보드 2</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {error && (
              <span className="text-red-500 text-xs mt-1">{error.message}</span>
            )}
          </div>
        )}
      />

      {/* hashtags */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium" htmlFor="description">
          태그
        </label>
        <input
          id="hashtags"
          type="text"
          ref={inputRef}
          placeholder="태그를 입력해주세요."
          className="block w-full border px-4 py-3 rounded-lg text-sm text-zinc-700"
          onKeyDown={handleKeyDown}
        />
        <div className="flex flex-wrap gap-2">
          {hashtags.map((tag, idx) => (
            <span
              className="bg-gray-200 rounded-md px-2 text-sm cursor-pointer"
              key={`tag-${idx}`}
              onClick={() => handleDeleteTag(tag)}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PinForm;
