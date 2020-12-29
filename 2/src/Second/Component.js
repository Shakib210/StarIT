import React,{useState} from 'react'
import '../App.css'

const data=[
    { name: 'Product A', price: 300},
    { name: 'Product B', price: 200},
    { name: 'Product C', price: 700},
    { name: 'Product D', price: 500},
    { name: 'Product E', price: 650},
    { name: 'Product F', price: 800},
];

export const Component = () => {
    const [stop, setStop] = useState(3)

    return (
        <div className='div'>
        <ul>
        {data.slice(0,stop).map(single=>{
               return  <li key={single.price}>Name: {single.name} & Price: {single.price}</li>
        })}
        </ul>
            {stop===3 && <button  className='btn' onClick={()=>setStop(data.length)}>View All</button>}
            {stop===data.length && <button className='btn' onClick={()=>setStop(3)}>Collapse</button>}
        </div>
    )
}


