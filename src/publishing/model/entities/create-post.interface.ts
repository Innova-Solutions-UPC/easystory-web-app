import type {EPostStatus} from "@/publishing/model/entities/post-status.enum";

export interface CreatePostInterface {
    title?: string,
    description?: string,
    status?: EPostStatus | string,
    content?: string,
    image?: string | FormData,
    hashtags?: Array<string> | any
}
