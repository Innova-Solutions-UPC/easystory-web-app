import {ApiServices} from "@/shared/service/api.services";
import type {ICreatePost} from "@/publishingLifecycle/model/IPublishing";

export class PublishingApiServices extends ApiServices{
    constructor() {
        super({baseUrl: '/v1/posts'});
    }

    async getAllPosts(p_page: number, p_limit: number, p_authorId?: number, hashtag?: string){
        const config ={
            params: {
                page: p_page,
                limit: p_limit,
                author: p_authorId,
                hashtag: hashtag
            }
        }
        return (await (this.get('/', config))).data;
    }

    async getPostsBySlug(p_slug: string){
        const config = {
            params: {
                slug: p_slug
            }
        }
        return (await this.get('/', config)).data;
    }

    async createNewPost(p_post: ICreatePost){
        return (await this.post('',p_post)).status;
    }

    async updatePost(p_post: ICreatePost){
        return (await this.patch('', p_post)).status;
    }

}
