import {SocialApiServices} from "@/social/service/social-api.services";
import type {AuthorPosts} from "@/shared/models/entities/author-posts.interface";
import type {Item} from "@/shared/models/entities/item.interface";
import {reactive} from "vue";

export class SocialFacade {
    private apiService: SocialApiServices;
    private _allPosts: AuthorPosts | undefined = undefined;
    private _selectedPost: Item | undefined = undefined;

    constructor() {
        this.apiService = new SocialApiServices();
    }

    async loadPosts(){
        this._allPosts = await this.apiService.getAllPosts();
    }

    set selectedPost(value: Item | undefined) {
        this._selectedPost = value;
    }

    get allPosts(): AuthorPosts | undefined {
        return this._allPosts;
    }

    get selectedPost(): Item | undefined {
        return this._selectedPost;
    }

    async bookmarkAPost(p_postId: string): Promise<number>{
        return await this.apiService.createBookMark(p_postId);
    }
}
const socialFacade = reactive(new SocialFacade());
export default socialFacade;
