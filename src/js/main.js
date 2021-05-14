export function addDragAndDrop() {

    $(function () {
        $(".taskList").sortable({
            connectWith: ".connectedSortable",
            stop: function (event, ui) {
                const taskId = ui.item[0].dataset.taskid
                console.log(taskId);
                const parent = ui.item[0].parentNode;
                console.log(parent);
                console.dir(parent);

                const childrenArr = Array.from(parent.children)
                console.log(childrenArr);

                const child = childrenArr.find(c => c.dataset.taskid === taskId)
                const childIndex = childrenArr.findIndex(c => c.dataset.taskid === taskId)
                console.log(child);
                console.log('new index', childIndex);
            }
        }).disableSelection();
    });
}
