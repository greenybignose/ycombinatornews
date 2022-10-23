import React, {useRef, useEffect} from 'react';
import './Job.css';

const Job = (props) => {

const arrayfornew = useRef([]);

 const [, updateState] = React.useState();
 const forceUpdate = React.useCallback(() => updateState({}), []);

async function waitme(ft, x){
try{
await fetch(ft, {
               method: "GET",
               headers: { 'Content-Type': 'application/json' },
}).then((response) =>  response.json())
   .then(function(data) {
         let dataurl = "( " + data.url + " )";
         let datascore = data.score + " points";
         let databy = "by " + data.by;
         let curdate = new Date();
         let fromdb = new Date(data.time);
          let curminutes = curdate.getMinutes() - fromdb.getMinutes();
         let datatimestamp = curminutes + " minutes ago | hide | past | discuss";
         
       let toprowspandata = data.title + dataurl;
       let bottomrowspandata = datascore + " " + databy + " " + datatimestamp;

    arrayfornew.current.push(<div key={x} className="joblistfordata" >
<div className="jobtoprowdata">
<span className="jobtoprowspan">{toprowspandata}</span>
</div>
<div className="jobbottomrowdata">
<span className="jobbottomrowspan"> {bottomrowspandata} </span>
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

   let tempdata = [];

 await fetch("https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty", {
               method: "GET",
               headers: { 'Content-Type': 'application/json' },
}).then((response) =>  response.json())
   .then(function(data) {
     tempdata = data;
})

return tempdata;
}
 catch(error){
    console.log(error);
}
}

async function insidefor(){
    try{ 
   let data = await firstrun();   

   for(let x=0; x < 30; x++){
     let fetchdatanya = "https://hacker-news.firebaseio.com/v0/item/" + data[x] + ".json?print=pretty";
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

useEffect(() => {
lastcall();
}, [props.count]);

return(
<div className="jobmiddlepageinside">
{arrayfornew.current}
</div>
);

} 

export default Job;
