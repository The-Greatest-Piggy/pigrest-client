"use client";

import Input from "@/components/common/Input";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

const Auth = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    userId: "",
    password: "",
    username: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const [variant, setVariant] = useState<"login" | "register">("login");

  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === "login" ? "register" : "login"));
    // initialize
    setUser({
      userId: "",
      password: "",
      username: "",
    });
  }, []);

  // TODO: login, resiger logic 붙이기
  // TODO: 비로그인 시, 보이는 layout이 바껴야됨 (나중에 token으로 처리)
  const handleLogin = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const { userId, password } = user;

      // 모든 항목이 채워져야 한다
      if (!userId.trim() || !password.trim()) {
        alert("all fields are required");
        return;
      }

      // userId

      // password

      router.push("/");
    },
    [router, user]
  );
  const handleRegister = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const { userId, username, password } = user;

      // 모든 항목이 채워져야 한다
      if (
        !userId.trim() ||
        !username.trim() ||
        !password.trim() ||
        !confirmPassword.trim()
      ) {
        alert("all fields are required");
        return;
      }

      /**
       * userId
       * @rule 4 ~ 12글자: "아이디는 4자 이상 12자 이하로 입력해주세요."
       * @rule 영어 소문자, 숫자 가능, 특수기호는 언더바만 가능: "아이디는 영문 소문자, 숫자, 특수문자(_)로만 구성해야 합니다."
       *
       * // TODO: 이미 사용중인 경우: "이미 사용하고 있는 아이디입니다."
       */

      /**
       * password
       * @rule 8 ~ 20글자: "비밀번호는 8자 이상 20자 이하로 입력해주세요."
       * @rule 영문 대/소문자, 숫자, 특수문자 모두 한 글자 이상씩 포함. 단, 특수문자는  !@#$%^&*중 하나
       * @rule 비밀번호 확인과 일치 여부: "비밀번호와 비밀번호 확인이 일치하지 않습니다."
       */

      /**
       * username
       * @rule 4 ~ 12글자: "닉네임은 4자 이상 12자 이하로 입력해주세요."
       * @rule 한글, 영문 소문자, 숫자 가능, 특수기호는 언더바만 가능: "닉네임은 한글, 영문 소문자, 숫자, 특수문자(_)로만 구성해야 합니다."
       */

      router.push("/");
    },
    [router, user, confirmPassword]
  );

  return (
    <div>
      <div className="w-full h-full">
        <div className="flex justify-center">
          <div
            className="
          px-16 
          py-16 
          self-center 
          mt-2 
          lg:w-3/5
          lg:max-w-xl
          rounded-md 
          w-full
          "
          >
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>

            {/* input */}
            <div className="flex flex-col gap-4">
              {/* userId */}
              <Input
                id={user.userId}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, userId: e.target.value }))
                }
                value={user.userId}
                label="ID"
                type="text"
              />
              {/* password */}
              <Input
                id={user.password}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, password: e.target.value }))
                }
                value={user.password}
                label="Password"
                type="password"
              />
              {/* confirm password */}
              {variant === "register" && (
                <Input
                  id={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  label="Confirm password"
                  type="password"
                />
              )}
              {/* username */}
              {variant === "register" && (
                <Input
                  id={user.username}
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, username: e.target.value }))
                  }
                  value={user.username}
                  label="Username"
                  type="text"
                />
              )}
            </div>

            {/* login/register button */}
            <button
              // FIXME: 나중에 로직 붙이고 나서 onClick 수정할 것
              onClick={variant === "login" ? handleLogin : handleRegister}
              className="
            bg-pink-400
            hover:bg-pink-600
            py-3 
            text-white
            text-lg
            font-bold
            rounded-md 
            w-full 
            mt-10 
            transition
          "
            >
              {variant === "login" ? "Login" : "Register"}
            </button>

            {/* footer */}
            <p className="text-neutral-500 mt-4 text-sm text-end">
              {variant === "login"
                ? "아직 회원이 아니신가요?"
                : "이미 계정이 있으신가요?"}
              <span
                onClick={toggleVariant}
                className="
              text-zinc-700
              ml-2
              hover:underline
              hover:text-zinc-950
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
  );
};

export default Auth;
