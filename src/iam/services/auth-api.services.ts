import {ApiServices} from "@/shared/service/api.services";
import type {LoginForm} from "@/shared/models/entities/login-form.interface";
import {StatusCodes} from "http-status-codes";
import type {RegisterUser} from "@/iam/models/registerUser";
import appController from "@/shared/models/Controller";
import type {ResProfile} from "@/shared/models/entities/res-profile.interface";
import type {ResLogin} from "@/shared/models/entities/res-login.interface";

export default class AuthService extends ApiServices{
    constructor(){
        super({baseUrl: '/v1/auth'})
    }

    /**
     * Login the user and store the access token to TokenService.
     *
     * @param p_payload ILoginForm
     * @returns
     */
    async doLogin(p_payload: LoginForm): Promise<ResLogin | null>{

        const rs = await this.post('/login', p_payload);

        if (rs.status == StatusCodes.CREATED){
            appController.user.m_profile = rs.data.authenticatedUser;
            return (rs).data;
        }

        else
            return null;
    }

    async getProfile(): Promise<ResProfile>{
        return (await this.get('/user')).data
    }

    async createAccount(p_registerUserInformation: RegisterUser){
        return (await this.post('/register', p_registerUserInformation));
    }
}
