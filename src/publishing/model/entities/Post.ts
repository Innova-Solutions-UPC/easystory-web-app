import type {Author} from "@/publishing/model/entities/Author";
import type {Hashtag} from "@/publishing/model/entities/Hashtag";
import type {Metadata} from "@/publishing/model/entities/Metadata";

export interface Post {
    id: number
    title: string
    status: string
    slug: string
    description: string
    content: string
    image: string
    author: Author
    hashtags: Hashtag[]
    metadata: Metadata
    createdAt: string
    updatedAt: string
}
