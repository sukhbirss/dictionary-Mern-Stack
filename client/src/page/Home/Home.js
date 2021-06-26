import style from "./home.module.css"

import AddIcon from '../../components/AddIcon/AddIcon'
import AddNewWord from '../../components/AddNewWord/AddNewWord'
import axios from 'axios'
import { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom'

function Home() {
  const history = useHistory();
  const [trigger, setTrigger] = useState(false)
  const [show, setShow] = useState(false)

  const [data, setData] = useState([{"word":"LOADING","meaning":"nothing"}])
  useEffect(() => {
      axios.get('/api/getdata')
      .then((res) => {
          setData(res.data.vocab)
      })
  }, [])
    
  console.log(trigger)
  return (
        <div className={style.container}>
        	<div className={style.header}>
        		<p>Vocab</p>
        		<div className={style.icon}></div>
        	</div>
        	<div className={style.result}>
        		<div className={style.result_top}>
        			<p>words list</p>
        		</div>
        		<div className={style.result_data}>
        		{
        			data.map((el) =>{
        				return(
        						<div onClick={()=>history.push(`/${el.word}`)}>
				        			<p >{el.word}</p>
				        			<p>{el.meaning}</p>
				        		</div>
        					)
        			})
        		}
        			
        		</div>
        	</div>

        	<AddIcon setTrigger={setTrigger}/>

            {trigger && <AddNewWord setTrigger={setTrigger} setData={setData} />}
        </div>
  );
}

export default Home;