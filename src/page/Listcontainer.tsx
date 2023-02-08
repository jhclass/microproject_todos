import React from 'react';
import {Draggable} from 'react-beautiful-dnd';
import styled from 'styled-components';


const Card = styled.li`
background-color: ${(props)=>props.theme.cardColor};
padding:10px 10px;
border-radius:5px;
margin-bottom:5px;
`;

interface IDraggabbleCardProps {
    toDo:string,
    index:number,
    key:string
}
function Listcontainer({toDo,index}:IDraggabbleCardProps){
    
    return (
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
          
    );
}
export default React.memo(Listcontainer);
