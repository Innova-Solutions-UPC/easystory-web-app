import type {AuthorInterface} from "@/publishing/model/entities/author.interface";
import type {Hashtag} from "@/publishing/model/entities/hashtag";

export interface Item {
    id: number
    title: string
    status: string
    slug: string
    description: string
    content: string
    image: string
    createdAt: string
    updatedAt: string
    author: AuthorInterface
    hashtags: Hashtag[]
}
