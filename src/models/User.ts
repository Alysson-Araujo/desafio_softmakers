export interface UserCreate {
    name: string;
    email: string;
    password: string;
}

export interface AuthRequest {
    email: string;
    password: string;
}

export interface UserCreated {
    id: string;
    name: string;
    email: string;
}

export interface Login{
    id: string;
    name: string;
    email: string;
    token: string;
}