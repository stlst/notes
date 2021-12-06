export enum Gender {
  male,
  female,
}
export interface Animal {
  name: string;
  gender: Gender;
  eat: (food: string) => void;
}
