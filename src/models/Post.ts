export interface PostCreate {
    title: string;
    content: string;
    user_id: string;
}

export interface PostUpdate {
    title?: string;
    content?: string;
    postId: string;   
    postUserId: string;
}

export interface PostCreated {
    id: string;
    title: string;
    content: string;
    user_id: string;
}

export interface PostUpdated {
    title: string;
    content: string;
    id: string;   
}