import logo from './logo.svg';
import './App.css';
//import data from './test-data.json'
import React from 'react';
import { useState,Fragment  } from 'react';
import {nanoid } from 'nanoid';

function App() {
	const [ editing, setEditing ] = useState(false)
	const initialFormState = { id: null, username: '', color: '' }

  // const [usercolor , setUsercolor ] = useState([
  //   {
  //     "id": '',
  //     "username": "",
  //     "color": ""
  //   }
  // ]);

  const [usercolor , setUsercolor ] = useState([
  ]);
  const [colorCount , setAllcolorlist ] = useState([{
    red:0,
    green:0,
    yeallow:0
  }]);


  const [addFromData , setfromdata ] = useState({
    id:'',
    username:'',
    color:''
  })


  const [editusercolorid, Seteditcolorid] = useState(null);

 const handaleformchange = (event) => {
  event.preventDefault();
  const fieldname = event.target.getAttribute('name');
  const fieldvalue = event.target.value;
  const newFromData = {...addFromData};
  newFromData[fieldname] = fieldvalue;
  setfromdata(newFromData);
 }

 const handalsubmitfrom = (event) => {
  event.preventDefault();
  
  if (addFromData.username.trim() === "" || addFromData.color.trim() === "") {
    var error = "";

    alert("both fields are required");

  //  return false;
  }else{
    var error = "submit";

  }



    {usercolor.map((usercolordata, index) => {

    if (addFromData.username.trim() === usercolordata.username) {
      var error = "";

      alert("Name is already exist");

      //return false;
    }else{
      var error = "submit";

    }

  })}
  

if(error === "submit"){
  console.log(error+'==');

  const newdata = { 
    id:nanoid(),
    username:addFromData.username,
    color:addFromData.color
  }
  const newuserdatas = [...usercolor,newdata];
  setUsercolor(newuserdatas);
   countColors(newuserdatas);

  }


  //setTimeout(() => {  countColors() }, 1000);
  
 }
 const editmydata = (edituser) => {


  console.log(edituser);

  const editdata = { 
    id:edituser.id,
    username:edituser.username,
    color:edituser.color
  }
  

  const oldarray = [...usercolor];
  const index = usercolor.findIndex((usercolor=> usercolor.id === edituser.id));

  oldarray.splice(index,-1);
  oldarray[index]=editdata;
  setUsercolor(oldarray);
  countColors(oldarray);

 }

 const handleeditchange = (event,userdata) => {


  setEditing(true);
  event.preventDefault();
  console.log(userdata);

  const newdata = { 
    id:userdata.id,
    username:userdata.username,
    color:userdata.color
  }

  setfromdata(newdata);

 }

const clearform = (event) =>{

  setEditing(false);
  //console.log(userdata);

  const clear = { 
    id:'',
    username:'',
    color:'color'
  }

  setfromdata(clear);


}


const countColors = (data) => {


  var redCount = 0;
  var countGreen =0;
  var countYeallow=0;

  {data.map((usercolordata, index) => {
  console.log(usercolordata.color);
    if (usercolordata.color === "red") {     
      redCount ++;
    }
    if (usercolordata.color === "green") {
      countGreen ++;
    }
    if (usercolordata.color === "yeallow") {
      countYeallow ++; 
       }

  })}
    const newarray = {
      red:redCount,
      green:countGreen,
      yeallow:countYeallow
    }
    const newuserdatas = [newarray];

    console.log(newuserdatas);
   // setUsercolor(newuserdatas);

 setAllcolorlist(newuserdatas);

  
}


 const deleteusercolor = (event,userdata) => {
  const oldarray = [...usercolor];
 const index = usercolor.findIndex((usercolor=> usercolor.id === userdata));
  console.log(userdata);
  oldarray.splice(index,1);
  setUsercolor(oldarray);
  countColors(oldarray);
  
 }
  return (
    <div className="App">
      <div className='from'>
        <form onSubmit={handalsubmitfrom}> 
          <div className='container'>
             {editing ? (
                  <Fragment>
                     <div className='input-form'>
                       <input type="text" name='username' value={addFromData.username} onChange={handaleformchange} />
                    </div>
                    <div className='dopdown'>
                      <select name='color' value={addFromData.color}  onChange={handaleformchange} >
                          <option value='color'>Select Color</option>
                          <option value='red'>Red</option>
                          <option value='green'>Green</option>
                          <option value='yeallow'>Yeallo</option>
                        </select>  
                      </div>

                        <div className='button'>
                        <button type='button'  onClick={() => editmydata(addFromData)}>update</button>
                        <button type='button' onClick={() => clearform(addFromData)} >Cancel</button>  
                        </div>

                  </Fragment>

               ) : (
                <Fragment>
                     <div className='input-form'>
                       <input type="text" name='username' value={addFromData.username} onChange={handaleformchange} />
                    </div>
                    <div className='dopdown'>
                      <select name='color' value={addFromData.color} onChange={handaleformchange} >
                          <option value='color'>Select Color</option>
                          <option value='red'>Red</option>
                          <option value='green'>Green</option>
                          <option value='yeallow'>Yeallo</option>
                        </select>  
                      </div>

            <div className='button'>
              <button type='submit'>Add</button>
              <button type='button' onClick={() => clearform(addFromData)} >Clear</button>  
              </div>
                </Fragment>

               )}

             </div> 
             </form>
      </div>
      
     <table>
        <tr>
          <th>Name</th>
          <th>Color</th>
          <th>Action</th>
        </tr>

      {usercolor.map((userdata) => (

          <tr key={userdata.id}>
          <td>{userdata.username}</td>
          <td>{userdata.color}</td>
          <td> <button type='button' onClick= {(event=> handleeditchange(event,userdata) )} > Edit</button>| 
          <button type='button' onClick= {(event=> deleteusercolor(event,userdata.id) )} > Delete</button></td>
          </tr>

      ))}
  

  </table>

  {colorCount.map((colordata) => (
      <div>
        <div>Red Color <label>{colordata.red}</label></div>
        <div>Green Color <label>{colordata.green}</label></div>
        <div>yeallow Color <label>{colordata.yeallow}</label></div>

        </div>
        
        ))}

    </div>
  );
}

export default App;
