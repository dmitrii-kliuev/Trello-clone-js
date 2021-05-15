export class Executor {
    id: number;
    name: string;
    lastName: string;
    fullName: string;

    constructor(name: string, lastName: string) {
        this.name = name;
        this.lastName = lastName;
        this.id = Date.now() + Math.floor(Math.random() * 470001)
        this.fullName = `${this.name} ${this.lastName}`;
    }
}

export const executorList: Executor[] = [];

export function fillExecutorList() {
    const selectExecutorList = document.querySelector('.executor')

    let executorListHTML = '<option disabled selected value> -- select an option --</option>'
    for (const executor of executorList) {
        executorListHTML += `<option value="${executor.id}">${executor.fullName}</option>`
    }
    selectExecutorList.innerHTML = executorListHTML;
}

export function getExecutorById(id: number): Executor {
    return executorList.find(c => c.id === id);
}
