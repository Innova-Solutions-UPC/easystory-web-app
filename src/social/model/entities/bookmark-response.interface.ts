import type {Bookmark} from "@/social/model/entities/bookmark.interface";
import type {BookmarkMeta} from "@/social/model/entities/bookmark-meta.interface";

export interface BookmarkResponse {
    items: Bookmark[];
    meta: BookmarkMeta;
}
