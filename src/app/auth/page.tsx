"use client";

import Input from "@/components/common/Input";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface FormInputProps {
  userId: string;
  password: string;
  confirmPassword: string;
  username: string;
}

// 비밀번호 유효성 검사를 위한 정규식들
const passwordValidation = {
  hasUpperCase: /[A-Z]/,
  hasLowerCase: /[a-z]/,
  hasNumber: /[0-9]/,
  hasSpecialChar: /[!@#$%^&*]/,
  validSpecialCharsOnly: /^[A-Za-z0-9!@#$%^&*]*$/,
};

const Auth = () => {
  const { handleSubmit, control, reset, formState } = useForm<FormInputProps>();

  const onSubmit: SubmitHandler<FormInputProps> = (data: FormInputProps) => {
    console.log("data: ", data);
  };

  const router = useRouter();
  const [variant, setVariant] = useState<"login" | "register">("login");

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === "login" ? "register" : "login"));
    // reset form
    reset();
  }, [reset]);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
      router.push("/");
    }
  }, [formState, reset, router]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="w-full h-full">
          <div className="flex justify-center">
            <div className="px-16 py-16 self-center mt-2 lg:w-3/5 lg:max-w-xl rounded-md w-full">
              <p className="text-black text-4xl mb-8 font-semibold">
                {variant === "login" ? "로그인" : "회원가입"}
              </p>

              {/* input */}
              <div className="flex flex-col gap-4">
                {/* userId */}
                <Controller
                  name="userId"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "아이디는 필수 입력 항목입니다.",
                    minLength: {
                      value: 4,
                      message: "아이디는 4자 이상 12자 이하로 입력해주세요.",
                    },
                    maxLength: {
                      value: 12,
                      message: "아이디는 4자 이상 12자 이하로 입력해주세요.",
                    },
                    pattern: {
                      value: /^[a-z0-9_]+$/,
                      message:
                        "아이디는 영문 소문자, 숫자, 특수문자(_)로만 구성해야 합니다.",
                    },
                    // TODO: 아이디 중복검사 로직 적용
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <div>
                      <Input
                        id="userId"
                        label="아이디를 입력해 주세요."
                        type="text"
                        onChange={field.onChange}
                        value={field.value || ""}
                      />
                      {error && (
                        <span className="text-red-500 text-sm mt-1">
                          {error.message}
                        </span>
                      )}
                    </div>
                  )}
                />

                {/* password */}
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "비밀번호는 필수 입력 항목입니다.",
                    minLength: {
                      value: 8,
                      message: "비밀번호는 8자 이상 20자 이하로 입력해주세요.",
                    },
                    maxLength: {
                      value: 20,
                      message: "비밀번호는 8자 이상 20자 이하로 입력해주세요.",
                    },
                    validate: (value) => {
                      if (!value) return true;

                      // 영문 대/소문자, 숫자, 특수문자 포함 여부
                      const hasUpper =
                        passwordValidation.hasUpperCase.test(value);
                      const hasLower =
                        passwordValidation.hasLowerCase.test(value);
                      const hasNumber =
                        passwordValidation.hasNumber.test(value);
                      const hasSpecial =
                        passwordValidation.hasSpecialChar.test(value);

                      if (!hasUpper || !hasLower || !hasNumber || !hasSpecial) {
                        return "비밀번호는 영문 대/소문자, 숫자, 특수문자를 최소 1개 이상 포함해야 합니다.";
                      }

                      // 허용된 특수문자로만 이루었는지 검사
                      if (
                        !passwordValidation.validSpecialCharsOnly.test(value)
                      ) {
                        return "비밀번호의 특수문자는 !@#$%^&*로만 구성해야 합니다.";
                      }

                      return true;
                    },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <div>
                      <Input
                        id="password"
                        label="비밀번호를 입력해 주세요."
                        type="password"
                        onChange={field.onChange}
                        value={field.value || ""}
                      />
                      {error && (
                        <span className="text-red-500 text-sm mt-1">
                          {error.message}
                        </span>
                      )}
                    </div>
                  )}
                />

                {/* confirm password */}
                {variant === "register" && (
                  <Controller
                    name="confirmPassword"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "비밀번호 확인은 필수 입력 항목입니다.",
                      validate: (value, formValues) =>
                        value === formValues.password ||
                        "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <div>
                        <Input
                          id="confirmPassword"
                          label="비밀번호를 다시 한번 입력해 주세요."
                          type="password"
                          onChange={field.onChange}
                          value={field.value || ""}
                        />
                        {error && (
                          <span className="text-red-500 text-sm mt-1">
                            {error.message}
                          </span>
                        )}
                      </div>
                    )}
                  />
                )}

                {/* username */}
                {variant === "register" && (
                  <Controller
                    name="username"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "닉네임은 필수 입력 항목입니다.",
                      minLength: {
                        value: 4,
                        message: "닉네임은 4자 이상 12자 이하로 입력해주세요.",
                      },
                      maxLength: {
                        value: 12,
                        message: "닉네임은 4자 이상 12자 이하로 입력해주세요.",
                      },
                      pattern: {
                        value: /^[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ_]+$/,
                        message:
                          "닉네임은 한글, 영문 소문자, 숫자, 특수문자(_)로만 구성해야 합니다.",
                      },
                    }}
                    render={({ field, fieldState: { error } }) => (
                      <div>
                        <Input
                          id="username"
                          label="닉네임을 입력해 주세요."
                          type="text"
                          onChange={field.onChange}
                          value={field.value || ""}
                        />
                        {error && (
                          <span className="text-red-500 text-sm mt-1">
                            {error.message}
                          </span>
                        )}
                      </div>
                    )}
                  />
                )}
              </div>

              {/* login/register button */}
              <button
                type="submit"
                // FIXME: 나중에 로직 붙이고 나서 onClick 수정할 것
                className="bg-pink-400 hover:bg-pink-600 py-3 text-white text-lg font-bold rounded-md w-full mt-10 transition"
              >
                {variant === "login" ? "Let's Pig!" : "Start Pigrest!"}
              </button>

              {/* footer */}
              <p className="text-neutral-500 mt-4 text-sm text-end">
                {variant === "login"
                  ? "아직 회원이 아니신가요?"
                  : "이미 계정이 있으신가요?"}
                <span
                  onClick={toggleVariant}
                  className="
              text-[#60BAAD]
              font-bold
              ml-2
              hover:underline
              hover:text-[#4f998e]
              cursor-pointer
            "
                >
                  {variant === "login" ? "회원가입" : "로그인"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Auth;
