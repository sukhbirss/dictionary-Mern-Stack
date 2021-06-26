
import style from "./addIcon.module.css"

function AddIcon(props) {

  return (
  		<div className={style.container} onClick={()=>props.setTrigger(true)}>
  			<p>+</p>
  		</div>
  );
}

export default AddIcon;
