import {PublishingApiServices} from "@/publishing/service/publishing-api.services";
import {reactive} from "vue";
import type {CreatePostInterface} from "@/publishing/model/entities/create-post.interface";
import {EPostStatus} from "@/publishing/model/entities/post-status.enum";
import type {AuthorPosts} from "@/publishing/model/entities/author-posts.interface";
import type {Item} from "@/publishing/model/entities/item.interface";
import appController from "@/shared/models/Controller";

export class PublishingController {

    private apiService: PublishingApiServices;
    private _posts: AuthorPosts | undefined = undefined;
    private _postsByAuthor: AuthorPosts | undefined = undefined;
    private _selectedPost: Item;

    constructor() {
        this.apiService = new PublishingApiServices();
        this._selectedPost = {
            content: "",
            description: "",
            hashtags: [],
            image: "",
            status: "",
            title: "",
        }
    }


    get postsByAuthor(): AuthorPosts | undefined {
        return this._postsByAuthor;
    }

    get posts(): AuthorPosts | undefined {
        return this._posts;
    }

    get selectedPost(): Item  {
        return this._selectedPost;
    }


    set selectedPost(value: Item ) {
        this._selectedPost = value;
    }

    async loadInfo(){
        this._posts = await this.apiService.getPostByAutenticatedUser();
        this._postsByAuthor = await this.apiService.getAllPostByAuthorId(appController.user.m_profile!.authenticatedUser.id);
    }

    async createNewPost(p_post: Item) {
        //TODO:
        const postDto: CreatePostInterface = {
            title: p_post.title,
            description: p_post.description,
            status: p_post.status,
            content: p_post.content,
            image: p_post.image,
            hashtags: p_post.hashtags
        }
        await this.apiService.createNewPost(postDto) ;
        console.log({p_post});
    }

    async updateSelectedPost(p_post: Item, postId: number){
        return (await this.apiService.updateExistingPost(PublishingController.convertItemToPostDTO(p_post), postId));
    }

    private static convertItemToPostDTO(p_postItem: Item): CreatePostInterface{
        return {
            title: p_postItem.title,
            description: p_postItem.description,
            status: p_postItem.status,
            content: p_postItem.content,
            image: p_postItem.image,
            hashtags:  p_postItem.hashtags?.map(e => {
                return [e.name]
                // @ts-ignore
            }).flat()
        };
    }

    async getPostsByAutenticatedUser(): Promise<AuthorPosts>{
        return await this.apiService.getPostByAutenticatedUser();
    }


}

const publishingController = reactive(new PublishingController());
export default publishingController;
