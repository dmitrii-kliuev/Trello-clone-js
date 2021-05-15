import {getTaskById, tasks} from "../ts/task";
import {refresh} from "../ts";

export function addDragAndDrop() {

    $(function () {
        $(".taskList").sortable({
            connectWith: ".connectedSortable",
            stop: function (event, ui) {
                const item = ui.item[0];
                const taskId = item.dataset.taskid

                const columnElement = item.closest('.column')
                const newColumn = columnElement.dataset.columnname;

                const tasksArr = Array.from(item.parentNode.children)
                const newIndex = tasksArr.findIndex(c => c.dataset.taskid === taskId)

                let oldIndex;
                let oldColumn;
                for (const column of Object.keys(tasks)) {
                    oldIndex = tasks[column].findIndex(task => task.id === Number(taskId));
                    if (oldIndex !== -1) {
                        oldColumn = column;
                        break;
                    }
                }

                const task = getTaskById(oldColumn, Number(taskId))
                tasks[oldColumn].splice(oldIndex, 1);
                tasks[newColumn].splice(newIndex, 0, task)

                refresh();
            }
        }).disableSelection();
    });
}
