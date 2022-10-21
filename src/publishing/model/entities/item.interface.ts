import type {AuthorInterface} from "@/publishing/model/entities/author.interface";
import type {HashtagInterface} from "@/publishing/model/entities/hashtag.interface";

export interface Item {
    id?: number
    title?: string
    status?: string
    slug?: string
    description?: string
    content?: string
    image?: string
    createdAt?: string
    updatedAt?: string
    author?: AuthorInterface
    hashtags?: HashtagInterface[]
}
