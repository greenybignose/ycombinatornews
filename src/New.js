import React, {useRef, useEffect} from 'react';
import './New.css';

const New = (props) => {

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
         
       let toprowspandata = data.id + " " + data.title + " " + dataurl;
       let bottomrowspandata = datascore + " " + databy + " " + datatimestamp;

    arrayfornew.current.push(<div key={x} className="newlistfordata" >
<div className="newtoprowdata">
<span className="newtoprowspan">{toprowspandata}</span>
</div>
<div className="newbottomrowdata">
<span className="newbottomrowspan"> {bottomrowspandata} </span>
</div>
</div>);
   });
    }
catch(error){
console.log(error)
}   
}

async function insidefor(){
try{
   arrayfornew.current.length = 0;
   let k = (30 * props.count) + 1;   
   
   for(let x=k ; x < (k + 30); x++){
     let fetchdatanya = "https://hacker-news.firebaseio.com/v0/item/" + x + ".json?print=pretty";
 
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
<div className="newmiddlepageinside">
{arrayfornew.current}
</div>
);

} 

export default New;
