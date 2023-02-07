
import {useForm} from 'react-hook-form';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import Listcontainer from './Listcontainer';
import {toDoState} from './atoms';
import {DragDropContext, Draggable, Droppable, DropResult} from 'react-beautiful-dnd';
interface IForm {
    toDo:string;
}

const Boards = styled.div``;
const Board = styled.ul``;
const Card = styled.li``;


function Section1() {
    const [toDos,setTodos] = useRecoilState(toDoState);
    const {register,handleSubmit,formState:{errors}, setFocus} = useForm<IForm>();
    const prohibited = /[0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/;
    // let today = new Date();
    // let year = today.getFullYear();
    // let month = today.getMonth()+1;
    // let date = today.getDate(); 
    // let hour = today.getHours();
    // let min = today.getMinutes();
 
    const onClick = (event:React.MouseEvent<HTMLElement>) => {
        console.log(event.currentTarget.textContent);
        
        let listName = document.querySelectorAll('.listName');
        listName.forEach((list)=>{
            list.classList.remove('textColor');
        })
        event.currentTarget.classList.add('textColor');
    }
    
    const onDragEnd = ({draggableId,destination,source}:DropResult) => {
        if(!destination) return;
        setTodos((oldToDos:any)=>{
            const copyToDos = [...oldToDos];
            const copyAnd = copyToDos.slice(source.index,source.index+1);
            console.log('a',copyAnd);
            copyToDos.splice(source.index,1);
            
            copyToDos.splice(destination.index,0,`${copyAnd[0]}`)
            console.log(copyToDos);
            return copyToDos;
            
        })
        console.log(draggableId,destination.index,source.index);
    }
    //console.log('어쩔',errors.toDo?.message);
    return (
        <div id="section1">
            <div className="wrapper">
                
                <ul id="selectSection">
                    <li >
                        <div className='listName textColor' onClick={onClick}>T-D</div>
                        <span className='listCount'>0</span>
                    </li>
                    <li >
                        <div className='listName' onClick={onClick}>Doing</div>
                        <span className='listCount'>0</span>
                    </li>
                    <li >
                        <div className='listName' onClick={onClick}>Done</div>
                        <span className='listCount'>0</span>
                    </li>
                </ul>

                
                <div id="inputSection">
                    
                    <div className='er-info'><span>{errors.toDo?.message}</span></div>
                </div>{ /* input */}
                <ul className='listContainer'>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Boards>
                        <Droppable droppableId='one'>
                            {(provide)=>
                                <Board ref={provide.innerRef} {...provide.droppableProps}>
                                    {toDos.map((toDo,index,el)=>(
                                       <Draggable draggableId={toDo} index={index} key={toDo}>
                                            {(provide)=>
                                                
                                                <Card
                                                    ref={provide.innerRef}
                                                    {...provide.dragHandleProps}
                                                    {...provide.draggableProps}
                                                >
                                                    <span>{toDo}</span>
                                                </Card>
                                            }
                                        </Draggable>     

                                    ))
                                    
                                    }   
                                    {provide.placeholder}
                                </Board>
                            }
                        </Droppable>
                        </Boards>
                    </DragDropContext>
                  
                    
                </ul>{ /* box */}
            </div>
        </div>
    );
}
export default Section1;