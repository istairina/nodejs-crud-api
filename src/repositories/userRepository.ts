import { readFile, writeFile } from 'node:fs/promises';
import User from '../entitites/user.ts';

type UserConstructorRepository = {
    file: string;
}

export default class UserRepository {
    file: string;
    constructor({file}: UserConstructorRepository) {
        this.file = file
    }

    async currentFileContent() {
        return JSON.parse((await readFile(this.file)).toString());
    }

    find() {
        return this.currentFileContent();
    }

    async create(data: User) {
        const currentFile = await this.currentFileContent();
        currentFile.push(data);
        await writeFile(this.file, JSON.stringify(currentFile));
        return data.id;
    }
}