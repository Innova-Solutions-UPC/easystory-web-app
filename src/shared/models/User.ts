import type {Profile} from "@/shared/models/entities/user.interfaces";
import AuthService from "@/iam/services/auth-api.services";
import tokenService from "@/iam/services/token-api.services";
import type {LoginForm} from "@/shared/models/entities/login-form.interface";
import appController from "@/shared/models/Controller";
import type {ResProfile} from "@/shared/models/entities/res-profile.interface";
import type {ResLogin} from "@/shared/models/entities/res-login.interface";
import type {UserInterface} from "@/shared/models/entities/autenticated-user.interface";

export default class User{
    private _m_name: string | null = null;
    private _m_password: string | null = null;

    private _m_profile: Profile | null | any = null;

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

    get m_profile(): Profile | null {
        return this._m_profile;
    }

    set m_profile(value: Profile | null) {
        this._m_profile = value;
    }

    getIsAuthenticated(): boolean{
        return tokenService.getToken() != null && tokenService.getToken() !== "";
    }

    /**********
     * Methods
     **********/
    async doLogin(p_loginForm: LoginForm): Promise<boolean> {
        const rsLogin: ResLogin | null = await this.m_apiService.doLogin({
            email: p_loginForm.email,
            password: p_loginForm.password,
        })
        if (rsLogin !== null){
            this.m_password = null;
            tokenService.saveToken(rsLogin.tokens.accessToken);
            this.m_apiService.setHeader()
            // ApiService.setHeader(rsLogin.access_token)

            //await this.getProfile();
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
    async getUserProfile(): Promise<UserInterface>{
        return (await this.m_apiService.getProfile()).authenticatedUser;
    }
}
