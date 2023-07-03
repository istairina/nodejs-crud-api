import {randomUUID} from 'node:crypto';


export type UserConstructorType = {
    username: string,
    age: number,
    hobbies: string[],
}

export default class User{
    id: string;
    username: string;
    age: number;
    hobbies: string[];

    constructor({username, age, hobbies}: UserConstructorType) {
        this.id = randomUUID(),
        this.username = username,
        this.age = age,
        this.hobbies = hobbies
    }
}