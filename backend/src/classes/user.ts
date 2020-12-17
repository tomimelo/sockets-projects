import { nanoid } from 'nanoid'

export class User {

    public id: string;
    public name: string;
    public color: string;
    public socket?: string;

    constructor(name: string) {
        this.id = nanoid();
        this.name = name;
        this.color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    }

}