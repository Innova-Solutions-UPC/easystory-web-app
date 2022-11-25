import {ApiServices} from "@/shared/service/api.services";
import type {UserInterface} from "@/shared/models/entities/autenticated-user.interface";

export class ProfileService extends ApiServices{
    constructor() {
        super({baseUrl: '/v1'});
    }

    //TODO:
    // async getBookmarksByUsername(username: string){
    //     return (await this.get(''))
    // }

    async getProfileByUsername(username: string): Promise<UserInterface>{
        return (await this.get('/users/' + username)).data;
    }

    async updateUserPhoto( user: UserInterface){
        return (await this.patch('/auth/users/' + user.username, {
            image: user.image,
            username: user.username,
            email: user.email,
        })).status;
        //return (await this.patch('/users/' + user.username, user)).status;

    }
}
