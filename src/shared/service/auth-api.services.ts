import {ApiServices} from "@/shared/service/api.services";
import type {ILoginForm, IResLogin, IResProfile} from "@/shared/models/IAuth";
import {StatusCodes} from "http-status-codes";

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
    async doLogin(p_payload: ILoginForm): Promise<IResLogin | null>{

        const m_data: ILoginForm = p_payload;

        const rs = await this.post('/login', m_data)

        if (rs.status == StatusCodes.CREATED)
            return (rs).data;
        else
            return null;
    }

    async getProfile(): Promise<IResProfile>{
        return (await this.get('/profile')).data
    }
}
