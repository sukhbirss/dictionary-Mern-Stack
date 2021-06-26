
import style from './wordDetail.module.css';
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react';
import axios from 'axios';

function WordDetail() {
	const {word} = useParams();
	const [data, setData] = useState(null)

	useEffect(() => {
			axios.get(`/worddetail/${word}`)
			.then((res) => {
				console.log(res.data)
				setData(res.data)
			})

	}, [])
  return (
  	<>
        {data &&

        <div className={style.container}>
	        	<h1>{word}</h1>
	        	<p>pronunciations: {data.results[0].lexicalEntries[0].entries[0].pronunciations[0].phoneticSpelling}</p>
	        	<p style={{marginTop:'20px',marginBottom:'20px'}}>{data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]}</p>
	        	{data.results[0].lexicalEntries[0].entries[0].senses.map((el) => {
	        		return(
	        			<>
	        				<li style={{marginBottom:'10px',color:'grey'}}>{el.definitions}</li>
	        			</>
	        			)
	        	})}
        </div>
        }
    </>
  );
}

export default WordDetail;

