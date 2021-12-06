import { Animal, Gender } from "./type";
export const cat: Animal = {
  name: "kitty",
  gender: Gender.female,
  eat: (food: string) => {
    console.log("eat", food);
  },
};
