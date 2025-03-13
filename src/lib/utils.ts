import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TaskStatus } from "@/features/task/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateInviteCode(length: number) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i = i + 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function snakeCaseToTitleCase(str: string){
  return str.toLowerCase()
  .replace(/_/g, " ")
  .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function convertStatusToKor(str: string){

  switch (str){
    case TaskStatus.BACKLOG:
      return "예정";
    case TaskStatus.IN_PROGRESS:
      return "진행";
    case TaskStatus.IN_REVIEW:
      return "검토";
    case TaskStatus.TODO:
      return "할일";
    case TaskStatus.DONE:
      return "완료";
  }

}
