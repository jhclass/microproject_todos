import Listcontainer from "./Listcontainer";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.ul`
background-color:${(props)=>props.theme.boardColor};
padding:30px 10px 10px 10px;
border-radius:5px;
min-height:200px;
`;
interface IBoardProps {
    toDos:string[],
    boardId:string
}

function Board({toDos,boardId}:IBoardProps){
    return(
    
    <Droppable droppableId={boardId}>
        {(provide)=>
            <Wrapper ref={provide.innerRef} {...provide.droppableProps}>
                {toDos.map((toDo,index,el)=>(
                <Listcontainer key={toDo} toDo={toDo} index={index}></Listcontainer>

                ))
                
                }   
                {provide.placeholder}
            </Wrapper>
        }
    </Droppable>
 
    );
}

export default Board;