import React, {useRef, useEffect} from 'react';
import './Ask.css';

const Ask = (props) => {

const arrayfornew = useRef([]);

 const [, updateState] = React.useState();
 const forceUpdate = React.useCallback(() => updateState({}), []);


// waitme function to display each tab for each data get from network
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
         
       let toprowspandata = data.title;
       let bottomrowspandata = datascore + " " + databy + " " + datatimestamp;

    arrayfornew.current.push(<div key={x} className="asklistfordata" >
<div className="asktoprowdata">
<span className="asktoprowspan">{toprowspandata}</span>
</div>
<div className="askbottomrowdata">
<span className="askbottomrowspan"> {bottomrowspandata} </span>
</div>
</div>);
   });
    }
catch(error){
  console.log(error);
}   
}

// firstrun function to get stories array first before resolving each elements into real json data
async function firstrun(){
try{ 
  arrayfornew.current.length = 0;

   let tempdata = [];

 await fetch("https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty", {
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

// insidefor function to get json data from hacker-news
async function insidefor(){
try{ 
   let data = await firstrun();   
 let k = (30 * props.count) + 1;   

   for(let x=k; x < (k + 30); x++){
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
<div className="askmiddlepageinside">
{arrayfornew.current}
</div>
);

} 

export default Ask;
