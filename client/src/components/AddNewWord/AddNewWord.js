
import style from "./AddNewWord.module.css"
import { useState } from 'react';
import axios from 'axios';
function AddNewWord(props) {
	const [word, setWord] = useState('');

	const addThisWord = (word) => {
       axios.post(`/api/word/${word}`)
          .then((res) =>{
            const meaning = res.data.results[0].lexicalEntries[0].entries[0].senses[0].definitions
            let newWord = {"word":word,"meaning":meaning}
            props.setData((prev) =>{return [newWord,...prev]})
            console.log(res.data.results[0])
          })
	}

  return (
  	<>
  		<div className={style.backdrop} onClick={()=>props.setTrigger(false)}></div>
  		<div className={style.container} >
  			<div className={style.box}>
  				<h3>Add to Dictionary</h3>
  				<input placeholder="Enter any word" value={word} onChange={(e)=>setWord(e.target.value)}/>
  				<div>
	  				<button>cancel</button>
	  				<button onClick={()=>addThisWord(word)}>Add</button>
	  			</div>
  			</div>
  		</div>
  	</>
  );
}

export default AddNewWord;

