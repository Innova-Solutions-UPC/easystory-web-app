import {ApiServices} from "@/shared/service/api.services";
import type {LoginForm, ResLogin, ResProfile} from "@/shared/models/entities/author.interfaces";
import {StatusCodes} from "http-status-codes";
import type {RegisterUser} from "@/iam/models/registerUser";

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

        const m_data: LoginForm = p_payload;
        m_data.token = 'token';
        m_data.rememberMe = true;

        const rs = await this.post('/login', m_data);

        if (rs.status == StatusCodes.CREATED)
            return (rs).data;
        else
            return null;
    }

    async getProfile(): Promise<ResProfile>{
        return (await this.get('/profile')).data
    }

    async createAccount(p_registerUserInformation: RegisterUser){
        return (await this.post('/register', p_registerUserInformation)).status;
    }
}
