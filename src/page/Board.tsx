import Listcontainer from "./Listcontainer";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.div`
background-color:${(props)=>props.theme.boardColor};
padding:30px 10px 30px 10px;
border-radius:5px;
min-height:200px;
display:flex;
flex-direction:column;
`;

interface IArticle {
    isDraggingOver:boolean,
    draggingFromThisWith?:boolean
    
}

const Article = styled.ul<IArticle>`
 background-color: ${props=>props.isDraggingOver?props.draggingFromThisWith?"#ffeaa7":"#fd79a8":"#b2bec3"};
 flex-grow:1;
 padding:10px;

`;

interface IBoardProps {
    toDos:string[],
    boardId:string
}

const Title = styled.h2<IArticle>`
text-align:center;
padding-bottom:30px;
font-size:2em;
font-family: 'Orbitron', sans-serif;
color: ${props=>props.isDraggingOver?props.draggingFromThisWith?"#a29bfe":"#fff":"#fff"};


`;


function Board({toDos,boardId}:IBoardProps){
    
    return(
    <Wrapper>
       
        <Droppable droppableId={boardId}>
            {(provide,snapshot)=>
              
                <Article draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)} isDraggingOver={snapshot.isDraggingOver} ref={provide.innerRef} {...provide.droppableProps}>
                    {snapshot.isDraggingOver?(<Title draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)} isDraggingOver={snapshot.isDraggingOver}>Move!</Title>):(<Title draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)} isDraggingOver={snapshot.isDraggingOver}>{boardId}</Title>)}
                    {toDos.map((toDo,index,el)=>(
                    <Listcontainer key={toDo} toDo={toDo} index={index}/>

                    ))
                    
                    }   
                    {provide.placeholder}
                </Article>
            }
        </Droppable>
     </Wrapper>
    
    );
}

export default Board;