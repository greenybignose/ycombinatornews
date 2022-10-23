import React, {useRef, useEffect, useState} from 'react';
import './Poll.css';

const Poll = (props) => {

const arrayfornew = useRef([]);

 const [, updateState] = useState();
 const forceUpdate = React.useCallback(() => updateState({}), []);
// this two code to force update, using this will makes code more controllable for update, than using setState

  const [count, setCount] = useState(0);

async function waitme(ft, x){
try{
await fetch(ft, {
               method: "GET",
               headers: { 'Content-Type': 'application/json' },
}).then((response) =>  response.json())
   .then(function(data) {
         let datascore = data.score + " points";
         let databy = "by " + data.by;
         let curdate = new Date();
         let fromdb = new Date(data.time);
          let curminutes = curdate.getMinutes() - fromdb.getMinutes();
         let datatimestamp = curminutes + " minutes ago | hide | past | discuss";
         
       let toprowspandata = data.id + " " + data.title;
       let bottomrowspandata = datascore + " " + databy + " " + datatimestamp;

    arrayfornew.current.push(<div key={x} className="polllistfordata" >
<div className="polltoprowdata">
<span className="polltoprowspan">{toprowspandata}</span>
</div>
<div className="pollbottomrowdata">
<span className="pollbottomrowspan"> {bottomrowspandata} </span>
</div>
</div>);
   });
    }
catch(error){
   console.log(error);
}   
}

async function firstrun(){
try{ 
 arrayfornew.current.length = 0;

   let firsttree = [];

         for(let y=1; y < 33259216; y++){
         let allsearch = "https://hacker-news.firebaseio.com/v0/item/" + y + ".json?print=pretty";

 await fetch(allsearch, {
               method: "GET",
               headers: { 'Content-Type': 'application/json' },
}).then((response) =>  response.json())
   .then(function(data) {
       console.log(data);
     if((data.type) && (data.type === "poll")){
          firsttree.push(data.id);
}
});

if(firsttree.length >= 30){
    break;
}
}
return firsttree;
}
catch(error){
   console.log(error);
}
}



async function insidefor(){
  try{ 
 let data = await firstrun();   
   
 let k = (30 * props.count) + 1;   

   for(let x=k; x < (k + 30); x++){
     let fetchdatanya = "https://hacker-news.firebaseio.com/v0/item/"+ data[x] +".json?print=pretty";
 await waitme(fetchdatanya, x);
}
}
catch(error){
   console.log(error);
}
}


async function lastcall(){
  try{ 
  await insidefor();
   forceUpdate();
}
  catch(error){
    console.log(error);
}
}

// this part of code special for poll to make them not run when page first loaded because so many burden
// for network and user pc
if(props.runornot !== "pollcomphid"){
  if(count === props.count){
   lastcall();
   let newcount = count + 1;
    setCount(newcount);
}
}

return(
<div className="pollmiddlepageinside">
{arrayfornew.current}
</div>
);

} 

export default Poll;
