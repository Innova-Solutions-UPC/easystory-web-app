import {ApiServices} from "@/shared/service/api.services";
import type {CreatePostInterface} from "@/publishing/model/entities/create-post.interface";
import type {AuthorPosts} from "@/publishing/model/entities/author-posts.interface";
import type {Item} from "@/publishing/model/entities/item.interface";

export class PublishingApiServices extends ApiServices{
    constructor() {
        super({baseUrl: '/v1'});
    }

    async getAllPostByAuthorId(authorId: number): Promise<AuthorPosts>{
        const config ={
            params: {
                author: authorId
            }
        };
        return (await (this.get('/posts', config))).data;
    }

    async getAllPosts(p_page: number, p_limit: number, p_authorId?: number, hashtag?: string): Promise<AuthorPosts>{
        const config ={
            params: {
                page: p_page,
                limit: p_limit,
                author: p_authorId,
                hashtag: hashtag
            }
        }
        return (await (this.get('/posts', config))).data;
    }

    async getPostsBySlug(p_slug: string){
        const config = {
            params: {
                slug: p_slug
            }
        }
        return (await this.get('/', config)).data;
    }

    async createNewPost(p_post: CreatePostInterface){
        return (await this.post('/posts',p_post)).status;
    }

    async updateExistingPost(p_post: CreatePostInterface, postId: number){
        return (await this.patch('/posts/' + postId, p_post)).data;
    }

    async updatePost(p_post: CreatePostInterface, id: number){
        return (await this.patch('{' + id + '}', p_post)).status;
    }

    async getPostByAutenticatedUser(): Promise<AuthorPosts> {
        return (await (this.get('/user-posts'))).data;
    }
}
