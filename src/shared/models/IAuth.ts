export interface ILoginForm {
    email: string;
    password: string;
}

export interface IResLogin {
    access_token: string;
}
export interface IResProfile {
    _id: string;
    email: string;
    user_name: string;
    first_name: string;
    last_name: string;
    password: string;
    photo_url: string | null;

}
