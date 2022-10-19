import type {EPostStatus} from "@/publishing/model/entities/postStatus.enum";

export interface CreatePostInterface {
    title?: string,
    description?: string,
    status?: EPostStatus,
    content?: string,
    image?: string | FormData,
    hashtags?: Array<string>
}
