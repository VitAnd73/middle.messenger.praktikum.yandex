import { File } from "./file";

export type Message = {
  id: number;
  user_id: number;
  chat_id: number;
  time: string;
  type: string | "message" | "file";
  content: number | string;
  file?: File;
  main?: boolean;
  is_read?: boolean;
};
