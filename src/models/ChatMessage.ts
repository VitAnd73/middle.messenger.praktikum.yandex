import {File} from "./File";

export interface ChatMessage {
    id: number;
    user_id: number;
    chat_id: number;
    time: string;
    type: string|'message'|'file';
    content: number | string;
    file?: File;
    main?: boolean;
    is_read?:boolean;
}
