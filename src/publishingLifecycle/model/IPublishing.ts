export interface ICreatePost {
    title: string,
    description: string,
    status: EPostStatus,
    content: string,
    image?: string,
    hashtags?: Array<string>
}

export enum EPostStatus{
    Draft='draft',
    Published='published',
    Discontinued='discontinued',
}

