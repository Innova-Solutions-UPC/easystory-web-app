import {ApiServices} from "@/shared/service/api.services";

export class SocialApiServices extends ApiServices{
    constructor() {
        super({baseUrl: '/v1'});
    };


    async getAllPosts(){
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
        await (this.post(`/bookmarks`,'',config));
    }
}
