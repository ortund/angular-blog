export class LoginModel {
    grant_type: string;
    username: string;
    password: string;

    constructor (grantType: string, user: string, pass: string)
    {
        this.grant_type = grantType;
        this.username = user;
        this.password = pass;
    }
}