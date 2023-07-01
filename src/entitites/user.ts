import {randomUUID} from 'node:crypto';


type UserType = {
    username: string,
    age: number,
    hobbies: string[],
}

export default class User {
    id: string;
    username: string;
    age: number;
    hobbies: string[];

    constructor({username, age, hobbies}: UserType) {
        this.id = randomUUID(),
        this.username = username,
        this.age = age,
        this.hobbies = hobbies,
    };
}