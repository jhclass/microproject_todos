import { IToDo} from "./atoms";

function Listcontainer({text,today}:IToDo){
    
    return (
        
            <li>
                <div className='lc-or'><span className='lc-or-title'>Organize</span><br/>{text}</div>
                <div className='lc-rt'><span className='lc-rt-title'>registration time</span><br/>{today}</div>
                <ul className="todoBtn">
                    <li className='active'>ToDo</li>
                    <li>Doing</li>
                    <li>Done</li>
                </ul>
                <span className='closeBtn xi-close-circle-o'></span>
            </li>
    );
}
export default Listcontainer;
