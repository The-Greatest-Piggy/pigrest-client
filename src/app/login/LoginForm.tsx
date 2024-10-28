"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const formSchema = z.object({
  userId: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full max-w-lg mx-auto"
      >
        {/* 로그인 제목 */}
        <div className="text-3xl font-bold mb-8">로그인</div>
        {/* 아이디 및 비밀번호 input */}
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-12 w-full rounded-xl"
                    placeholder="아이디를 입력해 주세요."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-12 w-full rounded-xl"
                    placeholder="비밀번호를 입력해 주세요."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-14">
          {/* 로그인 버튼 */}
          <Button
            className="h-12 w-full rounded-xl bg-main text-2xl font-bold text-white color-delay hover:bg-[#F81C9E]"
            type="submit"
          >
            Let&apos;s Pig!
          </Button>

          {/* 회원가입 링크 */}
          <div className="text-right mt-4">
            <span className="font-medium text-font2">계정이 없으신가요? </span>
            <Link href={"/register"} className="font-bold text-sub1">
              가입하기
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}
