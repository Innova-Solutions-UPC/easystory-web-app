import { reactive } from 'vue'

const TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'

/**
 * Manage the how Access Tokens are being stored and retreived from storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instance.
 **/
interface ITokenService {
    getToken(): string | null;
    saveToken(accessToken: string):  void;
    removeToken(): void;
    // getRefreshToken(): string | null;
    // saveRefreshToken(refreshToken: string): void;
    // removeRefreshToken(): void;
}

//https://www.codegrepper.com/code-examples/javascript/typescript+set+cookie
export class TokenService implements ITokenService{
    private m_accessToken: string | null = null

    // Server should set the cookie HttpOnly
    setCookie(name: string, value: string, days: number) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/;"; // TODO: Should be secure and httponly
    }

    getCookie(name: string): string | null {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i=0;i < ca.length;i++) {
            let c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    getToken(): string | null {
        this.m_accessToken = this.getCookie(TOKEN_KEY)
        return this.m_accessToken;
        // return localStorage.getItem(TOKEN_KEY)
    }

    saveToken(accessToken: string): void {

        this.setCookie(TOKEN_KEY, accessToken, 1)
        this.m_accessToken = this.getCookie(TOKEN_KEY)

        // localStorage.setItem(TOKEN_KEY, accessToken)
    }

    removeToken() {
        document.cookie = TOKEN_KEY +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        this.m_accessToken = null
        //		localStorage.removeItem(TOKEN_KEY)
    }

    // getRefreshToken() {
    // 	return localStorage.getItem(REFRESH_TOKEN_KEY)
    // }

    // saveRefreshToken(refreshToken: string) {
    // 	localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
    // }

    // removeRefreshToken() {
    // 	localStorage.removeItem(REFRESH_TOKEN_KEY)
    // }

}
const tokenService = reactive(new TokenService())
export default tokenService;
