export interface User {
    name: string;
    email: string;
    password: string;
}
export class UserModel {

    name: string;
    email: string;
    //role: UserRole;
    password: string;

    constructor(

        name: string,
        email: string,
        // role: UserRole,
        password: string,
    ) {

        this.name = name;
        this.email = email;
        // this.role = role;
        this.password = password;
    }
}