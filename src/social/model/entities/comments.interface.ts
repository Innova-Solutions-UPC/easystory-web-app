import type {User} from "@/social/model/entities/comments-user.interface";

export interface Item {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    user: User;
    edited: boolean;
}

