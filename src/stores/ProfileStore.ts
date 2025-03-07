import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

class ProfileStore {
  profileImage: string = "/images/tester.jpg";
  username: string = "피클_전";
  userId: string = "_pickles_the_pig";
  bio: string | null = "what did you say?";
  followers: number = 11;
  followings: number = 8;

  constructor() {
    makeAutoObservable(this);
  }

  setProfileImage(image: string) {
    this.profileImage = image;
  }

  setUsername(username: string) {
    this.username = username;
  }

  setBio(bio: string) {
    this.bio = bio;
  }
}

// context api 활용해서 mobx 스토어를 전역적으로 공유
const profileStore = new ProfileStore();
const ProfileContext = createContext(profileStore);

export const useProfileStore = () => useContext(ProfileContext);
export default profileStore;
