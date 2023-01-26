import {useForm} from 'react-hook-form';
interface messages {
    errors:any,
    toDo:string,
    bitch:RegExp,
    }
function Section1() {
    const {register,handleSubmit,formState:{errors}} = useForm<messages>();
    const bitch = /[0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/;

    const onValid = (data:any)=>{
        
       
    }
    
    console.log('어쩔',errors.toDo?.message);
    return (
        <div id="section1">
            <div className="wrapper">
                <div id="selectSection"></div>
                <div id="inputSection">
                    <form onSubmit={handleSubmit(onValid)}>
                        <input {...register("toDo",{required:"할일을 입력하여 주세요 :)",pattern:{value:bitch,message:"잘못된 작성방식입니다."}})} className="addInput" type="text" placeholder="무엇을 해야하나요?"/><br/>
                        <button className="addBtn"><span className="xi-plus-circle-o"></span></button>
                    </form>
                    <div><span>{errors.toDo?.message}</span></div>
                </div>{ /* input */}
                <div></div>{ /* box */}
            </div>
        </div>
    );
}
export default Section1;