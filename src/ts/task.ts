interface ITask {
    title: string;
    description: string;
    executor: string;
}

export class Task {
    id: number;
    title: string;
    description: string;
    executor: string;

    constructor(options: ITask = {title: 'UNSET', description: 'UNSET', executor: 'UNSET'}) {
        const {title, description, executor} = options;

        this.title = title;
        this.description = description;
        this.executor = executor;
        this.id = Date.now() + (Math.floor(Math.random() * 1000001));
    }
}
