import '../index.html';
import '../scss/main.scss';
import {addTask, createTaskColumnElementHtml, getTaskById, removeTask, Task, tasks} from "./task";
import {fillMockData} from "./mockData";
import {fillExecutorList, getExecutorById} from "./executor";
import {addDragAndDrop} from "../js/main";
import {saveTasksToStorage} from "./storage";

const visitedClass = 'visited';

enum Mode {
    Add = 'addMode',
    Edit = 'editMode'
}

const mainWrapperElement = document.querySelector('.mainWrapper');
const taskFormElement = document.getElementById('taskForm') as HTMLFormElement;
const btnRemoveElement = document.querySelector('.modalFooter__btnRemove') as HTMLLabelElement;
const btnAddUpdateElement = document.querySelector('.btnAddUpdateTask') as HTMLLabelElement;

const invalidFormMessageElement = document.querySelector('.invalidFormMessage') as HTMLDivElement;

const titleElement = document.getElementsByName('title')[0] as HTMLInputElement;
const descriptionElement = document.getElementsByName('description')[0] as HTMLInputElement;
const executorElement = document.querySelector('.executor') as HTMLSelectElement;


document.addEventListener("DOMContentLoaded", function () {
    mainWrapperElement.addEventListener('click', mainWrapperElementClickHandler)

    btnAddUpdateElement.addEventListener('click', btnAddUpdateClickHandler)
    btnRemoveElement.addEventListener('click', btnRemoveClickHandler)

    taskFormElement.addEventListener('focusout', checkInputHandler);

    titleElement.addEventListener('click', () => {
        titleElement.classList.toggle(visitedClass, true)
    });

    descriptionElement.addEventListener('click', () => {
        descriptionElement.classList.toggle(visitedClass, true)
    });

    executorElement.addEventListener('click', () => {
        executorElement.classList.toggle(visitedClass, true)
    });
});

function mainWrapperElementClickHandler(event: any) {
    event.stopPropagation();

    const {target} = event;
    const {classList} = target;
    const isAdd = classList.contains('addTask');

    const taskElement = target.closest('.task');

    const isEdit = taskElement?.classList.contains('editTask');
    const columnElement = target.closest('.column');

    cleanTaskForm();

    const columnName = columnElement?.dataset.columnname;
    taskFormElement.dataset.columnName = columnName;

    if (isAdd) {
        taskFormElement.dataset.mode = Mode.Add;
        btnRemoveElement.style.display = 'none';
        btnAddUpdateElement.textContent = 'Add';
    }

    if (isEdit) {
        taskFormElement.dataset.mode = Mode.Edit;
        taskFormElement.dataset.taskid = taskElement.dataset.taskid;

        const selectedTask = getTaskById(columnName, Number(taskElement.dataset.taskid));
        titleElement.value = selectedTask.title;
        descriptionElement.value = selectedTask.description;
        executorElement.value = String(selectedTask.executor.id);

        btnRemoveElement.style.display = 'block';
        btnAddUpdateElement.textContent = 'Save';
    }
}

function btnAddUpdateClickHandler(event: any) {
    const executorId = executorElement.value;

    const formData = new FormData(taskFormElement);
    const columnName = taskFormElement.dataset.columnName;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const executor = getExecutorById(Number(executorId))

    if (!checkInputHandler()) {
        event.stopPropagation();
        event.preventDefault();
        return;
    }

    if (taskFormElement.dataset.mode === Mode.Add) {
        addTask(columnName,
            new Task({
                title: title,
                description: description,
                executor: executor
            }));
    }

    if (taskFormElement.dataset.mode === Mode.Edit) {
        const editedTask = getTaskById(columnName, Number(taskFormElement.dataset.taskid))
        editedTask.title = title;
        editedTask.description = description;
        editedTask.executor = executor;
    }

    cleanTaskForm();

    refresh();
}

function btnRemoveClickHandler() {
    if (!window.confirm('Sure?')) {
        return;
    }

    const columnName = taskFormElement.dataset.columnName;
    removeTask(columnName, Number(taskFormElement.dataset.taskid))
    cleanTaskForm();

    refresh();
}

export function checkInputHandler() {
    const executorId = executorElement.value;

    const formData = new FormData(taskFormElement);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    setInvalidWhenVisited(titleElement, !title);
    setInvalidWhenVisited(descriptionElement, !description);
    setInvalidWhenVisited(executorElement, !executorId);

    if (!title || !description || !executorId) {
        invalidFormMessageElement.style.visibility = 'visible';
        return false;
    } else {
        invalidFormMessageElement.style.visibility = 'hidden';
        return true;
    }
}

function cleanTaskForm() {
    titleElement.value = '';
    descriptionElement.value = '';
    executorElement.value = '';

    titleElement.classList.toggle(visitedClass, false);
    descriptionElement.classList.toggle(visitedClass, false);
    executorElement.classList.toggle(visitedClass, false);

    titleElement.classList.toggle('inputInvalid', false);
    descriptionElement.classList.toggle('inputInvalid', false);
    executorElement.classList.toggle('inputInvalid', false);

    invalidFormMessageElement.style.visibility = 'hidden';

    delete taskFormElement.dataset.mode;
    delete taskFormElement.dataset.taskid;
    delete taskFormElement.dataset.columnName;
}

export function renderTasks() {
    mainWrapperElement.innerHTML =
        Object
            .keys(tasks)
            .map(columnName => createTaskColumnElementHtml(columnName))
            .join('');
}

export function refresh() {
    renderTasks();
    addDragAndDrop();
    saveTasksToStorage();
}

function setInvalidWhenVisited(element: any, isInvalid: boolean) {
    if (element.classList.contains(visitedClass)) {
        element.classList.toggle('inputInvalid', isInvalid)
    }
}

function initApplication() {
    fillMockData();
    refresh();
    fillExecutorList();
}

initApplication();
