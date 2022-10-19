import type {Item} from "@/publishing/model/entities/item.interface";
import type {Meta} from "@/publishing/model/entities/meta.interface";
import type {Links} from "@/publishing/model/entities/link.interface";

export interface AuthorPosts {
    items: Item[]
    meta: Meta
    links: Links
}
