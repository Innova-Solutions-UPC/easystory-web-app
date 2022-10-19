export interface LoginForm {
    email: string;
    password: string;
}

export interface ResLogin {
    access_token: string;
}
export interface ResProfile {
    _id: string;
    email: string;
    user_name: string;
    first_name: string;
    last_name: string;
    password: string;
    photo_url: string | null;

}
