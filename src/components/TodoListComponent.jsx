import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {AiFillDelete} from 'react-icons/ai'
import {TbEdit} from 'react-icons/tb'
import './TodoList.css'
const TodoListComponent = () => {
  const [text,setText] = useState('')
  const [taskList,setTaskList] = useState([])

  useEffect(() => {
    getAllTask(setTaskList);
  },[])
  const addTodoList = () => {
    
    if(text!==''){
    fetch(`http://localhost:3500/api/v1/list`,{
      method:`POST`,
      crossDomain:true,
      headers: {
        'content-type' : 'application/json',
        'Access-Control-Allow-Origin':'*'
      },

      body : JSON.stringify({
        text:text
      })
    })
    .then((response)=>response.json())
    .then((data)=>{
      console.log(data);

    })
    getAllTask(setTaskList)
  }
    
  }

  const getAllTask = (setTaskList)=>{
    axios.get(`http://localhost:3500/api/v1/list`)
    .then(({data})=>{
      console.log(data)
      setTaskList(data)
    })
  }

  function updateTodo(id,text) {
    if(text !== ''){
      fetch(`http://localhost:3500/api/v1/list/${id}`,{
        method:`PATCH`,
        crossDomain:true,
        headers: {
          'content-type' : 'application/json',
          'Access-Control-Allow-Origin':'*'
        },
        body: JSON.stringify({
          text:text,
          id:id
        })
      })
      .then((response)=>response.json())
      .then((data)=>{
        console.log(data)
        getAllTask(setTaskList)
      })
    }
    else{
      console.log("Enter the update value");
    }
    
  }

  function deleteAList (id){
    fetch(`http://localhost:3500/api/v1/list/${id}`,{
      method:`DELETE`,
      crossDomain:true,
      headers: {
        'content-type' : 'application/json',
        'Access-Control-Allow-Origin':'*'
      }
      
    })
    .then((response)=>response.json())
    .then((data)=>{
      console.log(data)
      getAllTask(setTaskList)
    })
  }
  return (
    <div className='container'>
      <div className='container-box'>
      <div className='input-fiel'>
        <input
        type='text'
        placeholder='Add task..'
        value={text}
        onChange={(e)=>setText(e.target.value)}
        />
      </div>
      <div className='add-btn btn'>
        <button onClick={addTodoList} >Add</button>
      </div>
      </div>
      <div>{taskList.map((task) => (
        <ul className='display-body-list'>
         
          <li key={task._id}
          className='list-item'
          >{task.text} 

<button 
          onClick={()=>updateTodo(task._id,text)}
          className='upd-btn btn'
          >
            Edit <TbEdit/>
          </button>
          <button
          className='dlt-btn btn'
          onClick={() => deleteAList(task._id) }
          >
            Delete <AiFillDelete/>
            </button>
            </li>
            
        </ul>
      ))}</div>
    </div>
  )
}

export default TodoListComponent