
import {useForm} from 'react-hook-form';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import Board from './Board';
import {toDoState} from './atoms';
import {DragDropContext, DropResult} from 'react-beautiful-dnd';

interface IForm {
    toDo:string;
}
const Wrapper = styled.div`
display:flex;
max-width:1080px;
width:100%;
margin:0 auto; 
justify-content:center;



`;
const Boards = styled.div`
display:grid;
width:100%;
grid-template-columns: repeat(3,1fr);
gap:20px;
`;


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
    
    const onDragEnd = (info:DropResult) => {
       const {destination, draggableId, source} = info;
        if(!destination)return;
        if(destination?.droppableId===source.droppableId){
             //같은보드에서 움직인 경우
             setTodos((oldToDos)=>{
                const boardCopy = [...oldToDos[source.droppableId]];
                console.log('a',boardCopy);
                boardCopy.splice(source.index,1);
                boardCopy.splice(destination.index,0,draggableId);
            
                return {
                    ...oldToDos,
                    [source.droppableId]:boardCopy,
                }

             });

        }else{
            //다른보드로 이동한 경우
            setTodos(allBoards=>{
                const sourceBoard = [...allBoards[source.droppableId]]; //현재보드
                const destinationBoard = [...allBoards[destination.droppableId]]; //바뀐보드
                sourceBoard.splice(source.index,1); //소스보드에서 지우고
                destinationBoard.splice(destination.index,0,draggableId); //옮기는 보드에서 추가
                return { //내용을 리턴해줘야지~
                    ...allBoards,
                    [source.droppableId]:sourceBoard,
                    [destination.droppableId]:destinationBoard

                }
            });
        }
        
        console.log('finished',source,destination);
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
                        <Wrapper>
                            <Boards>
                                {Object.keys(toDos).map((boardId,index)=>      
                                <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
                                
                                )}
                                
                            </Boards>
                        </Wrapper>
                        
                    </DragDropContext>
                  
                    
                </ul>{ /* box */}
            </div>
        </div>
    );
}
export default Section1;