export class LoginModel {
    GrantType: string;
    Username: string;
    Password: string;

    constructor (grantType: string, user: string, pass: string)
    {
        this.GrantType = grantType;
        this.Username = user;
        this.Password = pass;
    }
}