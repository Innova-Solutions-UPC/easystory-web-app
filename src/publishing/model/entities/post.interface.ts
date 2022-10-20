import type {AuthorInterface} from "@/publishing/model/entities/author.interface";
import type {Hashtag} from "@/publishing/model/entities/hashtag";
import type {MetadataInterface} from "@/publishing/model/entities/metadata.interface";

export interface PostInterface {
    id: number
    title: string
    status: string
    slug: string
    description: string
    content: string
    image: string
    author: AuthorInterface
    hashtags: Hashtag[]
    metadata: MetadataInterface
    createdAt: string
    updatedAt: string
}
