import { ChildrenProps } from "../../@types/task"

export function CalculateTaskPercent(dataChildren: ChildrenProps[]){
    var subtaskFinished = 0
    var amountTask = 0
    var valueUniteTask = 0
    dataChildren.forEach(subtask => {
        amountTask++
        if(subtask.finished_at != ""){
            subtaskFinished++
        }
    })
    if(amountTask == 0){
        valueUniteTask = 0
    } else {
        valueUniteTask = 100 / amountTask
    }
    var percent =  (subtaskFinished / 100) * valueUniteTask
    return percent
}