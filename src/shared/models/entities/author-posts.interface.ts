import type {Item} from "@/shared/models/entities/item.interface";
import type {Meta} from "@/publishing/model/entities/meta.interface";
import type {Links} from "@/publishing/model/entities/link.interface";

export interface AuthorPosts {
    items: Item[]
    meta: Meta
    links: Links
}
