import React from 'react';
import {Draggable} from 'react-beautiful-dnd';
import styled from 'styled-components';

interface IDragProps {
    isDragging:boolean;
}
const Card = styled.li<IDragProps>`
background-color: ${(props)=>props.theme.cardColor};
padding:10px 10px;
border-radius:5px;
margin-bottom:5px;
box-shadow:${props=>props.isDragging?"3px 3px 5px rgba(0,0,0,0.3)":"none"}
`;

interface IDraggabbleCardProps {
    toDo:string,
    index:number,
    key:string
}

function Listcontainer({toDo,index}:IDraggabbleCardProps){
    
    return (
        <Draggable draggableId={toDo} index={index} key={toDo}>
            {(provide,snapshot)=>
                <Card
                    isDragging={snapshot.isDragging}
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
