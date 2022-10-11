import {useRouter} from "vue-router";
import axios, {AxiosError} from "axios";
import type {AxiosRequestConfig, AxiosResponse} from "axios"
import {StatusCodes} from "http-status-codes";

export abstract class ApiServices {
    _baseUrl: string;
    _fullBaseApiURL: string;
    router: any;

    constructor(config: { baseUrl: string }) {
        this.router = useRouter();
        this._baseUrl = config.baseUrl;
        //TODO: set this with .env variables
        this._fullBaseApiURL = 'baseUrl' + this._baseUrl;
        //TODO:
        //this.setHeader();
    }

    setHeader() {
        //todo: when working with auth
        //axios.defaults.headers.common["Authorization"] = `Bearer ${tokenService.getToken()}`
    }

    removeHeader() {
        axios.defaults.headers.common = {}
    }

    async get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
        return axios.get(this._fullBaseApiURL + url, config)
            .then((response: AxiosResponse) => {
                return response
            })
            .catch((error: AxiosError) => {
                if (error.response?.status == StatusCodes.UNAUTHORIZED) {
                    //TODO:
                    //tokenService.removeToken();
                    this.router.push("/login")
                }
                return Promise.reject(error.response)
                // return error.response
            })
    }


    async post(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
        return axios.post(this._fullBaseApiURL + url, data, config)
            .then((response: AxiosResponse) => {
                return response
            })
            .catch((error: AxiosError) => {
                if (error.response?.status == StatusCodes.UNAUTHORIZED) {
                    //TODO:
                    //tokenService.removeToken();
                    this.router.push("/login")
                }
                return Promise.reject(error.response)
                // return error.response
            })
    }

    async patch(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
        return axios.patch(this._fullBaseApiURL + url, data, config)
            .then((response: AxiosResponse) => {
                return response
            })
            .catch((error: AxiosError) => {
                if (error.response?.status == StatusCodes.UNAUTHORIZED) {
                    //TODO:
                    //tokenService.removeToken();
                    this.router.push("/login")
                }
                return Promise.reject(error.response)
            })

    }
}
