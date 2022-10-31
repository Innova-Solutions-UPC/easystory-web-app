import {ApiServices} from "@/shared/service/api.services";
import type {AuthorPosts} from "@/shared/models/entities/author-posts.interface";

export class SocialApiServices extends ApiServices{
    constructor() {
        super({baseUrl: '/v1'});
    };


    async getAllPosts(): Promise<AuthorPosts>{
        return (await (this.get('/user-posts'))).data;
    }

    async getAllCommentsIntoAPost(p_slug: string){
        return (await (this.get(`/posts/${p_slug}/comments`))).data;
    }

    async createNewComment(p_slug: string, p_comment: string){
        return (await (this.post(`/posts/${p_slug}/comments`, p_comment))).data
    }

    async updateExistingComment(p_id: string, p_comment: string){
        return (await (this.patch(`/comments/${p_id}`, p_comment))).data
    }

    async createBookMark(p_postId: string){
        const config = {
            params: {
                post: p_postId
            }
        };
      return (await (this.post(`/bookmarks`,'',config))).status;
    }
}
