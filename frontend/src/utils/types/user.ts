export interface UserTeam {
    userID: string
    teamID: string
}

export interface UserContact {
    email: string
    phone: string
}

export interface UserName {
    last: string
    first: string
    middle?: string
}

export interface User extends UserTeam, UserContact, UserName {}