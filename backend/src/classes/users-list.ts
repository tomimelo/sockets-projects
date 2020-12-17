import { User } from "./user";

export class UsersList {
    private list: User[] = [];

    constructor() {}

    public addUser(user: User, socket: string) {
        user.socket = socket;
        this.list.push(user);
        return user;
    }

    public getList() {
        return this.list;
    }

    public getUser(socket: string) {
        return this.list.find(user => user.socket === socket);
    }

    public deleteUser(socket: string) {
        const deletedUser = this.getUser(socket);
        this.list = this.list.filter(user => user.socket !== socket);
        return deletedUser;
    }
}