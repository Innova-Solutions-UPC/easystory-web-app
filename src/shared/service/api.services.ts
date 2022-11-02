import {useRouter} from "vue-router";
import type {AxiosRequestConfig, AxiosResponse, AxiosError} from "axios"
import {StatusCodes} from "http-status-codes";
import axios from "axios";
import tokenService from "@/iam/services/token-api.services";

export abstract class ApiServices {
    _baseUrl: string;
    _fullBaseApiURL: string;
    router: any;

    constructor(config: { baseUrl: string }) {
        this.router = useRouter();
        this._baseUrl = config.baseUrl;

        this._fullBaseApiURL = import.meta.env.VITE_API_BASE_URL + this._baseUrl;
        //TODO:
        this.setHeader();
    }

    setHeader() {
        //todo: when working with auth
        axios.defaults.headers.common["Authorization"] = `Bearer ${tokenService.getToken()}`
        //axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*"
        axios.defaults.headers.common["Content-Type"] = 'application/x-www-form-urlencoded'
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
                    tokenService.removeToken();
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
                    tokenService.removeToken();
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
                    tokenService.removeToken();
                    this.router.push("/login")
                }
                return Promise.reject(error.response)
            })

    }

    async delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
        return axios.delete(this._fullBaseApiURL + url, config)
            .then((response: AxiosResponse) => {
                return response
            })
            .catch((error: AxiosError) => {
                if (error.response?.status == StatusCodes.UNAUTHORIZED) {
                    tokenService.removeToken();
                    this.router.push("/login")
                }
                return Promise.reject(error.response)
            })

    }
}
