export interface ICreatePost {
    title?: string,
    description?: string,
    status?: EPostStatus,
    content?: string,
    image?: string | FormData,
    hashtags?: Array<string>
}

export enum EPostStatus{
    Draft='draft',
    Published='published',
    Discontinued='discontinued',
}


export interface IPost {
    id: number
    title: string
    status: string
    slug: string
    description: string
    content: string
    image: string
    author: IAuthor
    hashtags: IHashtag[]
    metadata: IMetadata
    createdAt: string
    updatedAt: string
}

export interface IAuthor {
    id: number
    username: string
    email: string
    password: string
    firstName: string
    lastName: string
    bio: string
    verified: boolean
    createdAt: string
    updatedAt: string
}

export interface IHashtag {
    id: number
    name: string
    posts: string[]
    createdAt: string
    updatedAt: string
}

export interface IMetadata {
    id: number
    views: number
    shares: number
    post: string
}
