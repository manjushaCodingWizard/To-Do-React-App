import React, {useState, useEffect} from 'react';
import Todo from './Todo.js'
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import './App.css'
import db from './firebase'
import firebase from 'firebase'

function App() {
  const [todos,setTodos]= useState([]);  /*todos is an array which will contain to do list items*/
  const [input,setInput]= useState('');

  //when the app loads, we need to listen to the dattbase and fetch new todos as they get added/removed
  useEffect(() => {
    //this code here ....fires when the app.js loads
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => { //snapshot takes the snap of every single update in the input
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))  //returns array of strings of tasks
    })
  },[]);

  const addTodo = (event) => {
    //this will fire off when button is clicked
    event.preventDefault(); //stops automatic refreshing11

    db.collection('todos').add({
      todo: input,  //input is added to db then firesoff the snapshot which then update the todos
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setTodos([...todos,input]);  // ...todos is previous array. input will push that inputvalue into it
    setInput(''); //clearing input field after it's being added into list and hitting the button 
  }




  return (
    <div className="App">
      <h1>React ToDo List</h1>

      <form>    
        <FormControl>
          <InputLabel> Add your work here...</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)}/>  {/*value={input} means value is initially blank (input function is called,useState value empty initially), then when we type something,onChange is called; it calls an event and calls the function setInput then accepts its input value and put it in value={input}*/}
        </FormControl>

        <Button disabled={!input} type='submit' onClick={addTodo} variant="contained" color="primary">Add</Button> {/*disabled={!input}  means if input field is empty button is disabled*/}
        
      </form>      

      <ul>
        {todos.map(todo => (
          <Todo todo={todo} />
          //  <li>{todo}</li>
         ))}   {/* todos is array, todo is each item in that array.  So first it will map the todos array and then will put every todo item in list.*/}      
      </ul>
    </div>
  );
}

export default App;
