
import {useForm} from 'react-hook-form';
import { useRecoilState, atom } from 'recoil';
import Listcontainer from './Listcontainer';
import {todoState} from './atoms';
interface IForm {
    toDo:string;
}

function Section1() {
    const [todos,setTodos] = useRecoilState(todoState);
    const {register,handleSubmit,formState:{errors}, setFocus} = useForm<IForm>();
    const prohibited = /[0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/;
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth()+1;
    let date = today.getDate(); 
    let hour = today.getHours();
    let min = today.getMinutes();
    const onValid = ({toDo}:IForm)=>{
        setTodos(oldToDos=>[{text:toDo, id:Date.now(), today:`${year}년 ${month}월 ${date}일 ${hour}시 ${min}분`, category:"TO_DO"},...oldToDos])
        setFocus("toDo",{shouldSelect:true});
    }
    const onClick = (event:React.MouseEvent<HTMLElement>) => {
        console.log(event.currentTarget.textContent);
        
        let listName = document.querySelectorAll('.listName');
        listName.forEach((list)=>{
            list.classList.remove('textColor');
        })
        event.currentTarget.classList.add('textColor');
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
                    <form onSubmit={handleSubmit(onValid)}>
                        <input {...register("toDo",{required:"할일을 입력하여 주세요 :)",pattern:{value:prohibited,message:"잘못된 작성방식입니다."}})} className="addInput" type="text" placeholder="무엇을 해야하나요?"/><br/>
                        <button className="addBtn"><span className="xi-plus-circle-o"></span></button>
                    </form>
                    <div className='er-info'><span>{errors.toDo?.message}</span></div>
                </div>{ /* input */}
                <ul className='listContainer'>
                    {todos.map((todo)=><Listcontainer key={todo.id} {...todo}/>)}
                    
                </ul>{ /* box */}
            </div>
        </div>
    );
}
export default Section1;