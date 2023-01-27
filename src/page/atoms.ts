import {atom} from 'recoil';

export interface IToDo {
    text:string;
    category: "TO_DO" | "DOING" | "DONE";
    id:number;
    today:string;
}
export const todoState = atom<IToDo[]>({
    key:"toDo",
    default:[]
});