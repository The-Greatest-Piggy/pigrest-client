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
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  userId: z.string().min(2, {
    message: "ID must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  passwordRequired: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  userName: z.string().min(2, {
    message: "UserName must be at least 2 characters.",
  }),
  checked: z.boolean(),
});

export function RegisterForm() {
  const router = useRouter();

  // FIXME: 유효성 검사 구현 필요
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      password: "",
      passwordRequired: "",
      userName: "",
      checked: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    router.push("/login");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full max-w-lg mx-auto"
      >
        {/* 회원가입 제목 */}
        <div className="text-3xl font-bold mb-8">회원가입</div>
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
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordRequired"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-12 w-full rounded-xl"
                    placeholder="비밀번호를 다시 한번 입력해 주세요."
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-12 w-full rounded-xl"
                    placeholder="닉네임을 입력해 주세요."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-14 space-y-5">
          {/* checkbox */}
          <div className="items-top flex space-x-3">
            <FormField
              control={form.control}
              name="checked"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <label htmlFor="terms" className="text-sm font-medium">
              나는 돼지만을 생각할 것을 약속합니다.
            </label>
          </div>
          {/* 로그인 버튼 */}
          <Button
            className="h-12 w-full rounded-xl bg-main text-2xl font-bold text-white color-delay hover:bg-[#F81C9E]"
            type="submit"
            disabled={!form.getValues("checked")}
          >
            Let&apos;s Pig!
          </Button>
        </div>
      </form>
    </Form>
  );
}
