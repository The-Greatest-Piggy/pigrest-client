export const PUBLIC_STATUS_TYPE = {
  DEFAULT: "",
  PRIVATE: "비공개",
  PUBLIC: "공개",
} as const;

export type IsPublic = keyof typeof PUBLIC_STATUS_TYPE;

export interface Pin {
  imgUrl: string | null;
  title: string;
  description: string;
}

export interface Board {
  title: string;
  isPublic: IsPublic;
  pins: Pin[];
  updatedAt: Date;
}
