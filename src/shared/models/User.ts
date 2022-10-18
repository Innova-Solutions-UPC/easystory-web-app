import type {IProfile} from "@/shared/models/IUser";
import AuthService from "@/shared/service/auth-api.services";
import tokenService from "@/shared/service/token-api.services";
import type {ILoginForm, IResLogin} from "@/shared/models/IAuth";

export default class User{
    private _m_name: string | null = null;
    private _m_password: string | null = null;

    private _m_profile: IProfile | null = null;

    m_apiService = new AuthService();


    get m_name(): string | null {
        return this._m_name;
    }

    set m_name(value: string | null) {
        this._m_name = value;
    }

    get m_password(): string | null {
        return this._m_password;
    }

    set m_password(value: string | null) {
        this._m_password = value;
    }

    get m_profile(): IProfile | null {
        return this._m_profile;
    }

    set m_profile(value: IProfile | null) {
        this._m_profile = value;
    }

    getIsAuthenticated(): boolean{
        return tokenService.getToken() != null && tokenService.getToken() !== "";
    }

    /**********
     * Methods
     **********/
    async doLogin(p_loginForm: ILoginForm): Promise<boolean> {
        const rsLogin: IResLogin | null = await this.m_apiService.doLogin({
            email: p_loginForm.email,
            password: p_loginForm.password,
        })
        if (rsLogin !== null){
            this.m_password = null;
            tokenService.saveToken(rsLogin.access_token)
            // this.m_tokenService.saveRefreshToken(rsLogin.access_token)
            this.m_apiService.setHeader()
            // ApiService.setHeader(rsLogin.access_token)

            await this.getProfile();
            return true
        }

        return false
    }

    async logout(): Promise<void> {
        // Remove the token and remove Authorization header from Api Service as well
        tokenService.removeToken()
        // this.m_tokenService.removeRefreshToken()
        // ApiService.removeHeader()

        // NOTE: Again, we'll cover the 401 Interceptor a bit later.
        // ApiService.unmount401Interceptor()
    }

    async getProfile(): Promise<void>{
        this.m_profile = await this.m_apiService.getProfile()
    }
}
