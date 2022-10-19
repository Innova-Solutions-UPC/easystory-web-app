import type {EPostStatus} from "@/publishing/model/entities/PostStatus";

export interface CreatePost {
    title?: string,
    description?: string,
    status?: EPostStatus,
    content?: string,
    image?: string | FormData,
    hashtags?: Array<string>
}
