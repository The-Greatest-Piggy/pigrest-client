import { useMutation } from "@tanstack/react-query";
import { authService } from "@/api/auth";
import { useStore } from "@/providers/StoreProvider";
import { AxiosError } from "axios";
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "@/api/auth";
import { ApiResponse } from "@/api/axios";

export const useLoginMutation = () => {
    const { authStore } = useStore();

    return useMutation<
        ApiResponse<LoginResponse>,
        AxiosError<ApiResponse<null>>,
        LoginRequest>({
            mutationFn: (request: LoginRequest) => authService.login(request),
            onSuccess: ({ data }) => {
                if (data?.accessToken) {
                    authStore.setAccessToken(data.accessToken);
                    authStore.setUser(data.username);
                }
            },
            onError: (error) => {
                console.log(error.response?.data.message);
            }
        });
}

export const useRegisterMutation = () => {
    return useMutation<
        ApiResponse<RegisterResponse>,
        AxiosError<ApiResponse<null>>,
        RegisterRequest>({
            mutationFn: (request: RegisterRequest) => authService.register(request),
        });
}