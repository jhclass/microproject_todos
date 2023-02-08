import {atom} from 'recoil';
interface IToDoState {
    [key:string]:string[],
}
export const toDoState = atom<IToDoState>({  //IToDoState 이거 없으면 어떻게 되는지 아시는감.
    key:"toDo",
    default: {
        "to_do":['a','b','c','d','e'],
        "Doing":['1','2','3','4','5'],
        "Done":['ㄱ','ㄴ']

    }
});
