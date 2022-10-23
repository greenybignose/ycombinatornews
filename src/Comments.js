import React, {useRef, useEffect} from 'react';
import './Comments.css';

const Comments = (props) => {

const arrayfornew = useRef([]);
const takenotes = useRef(1); // this is useful for notes on which position query now

 const [, updateState] = React.useState();
 const forceUpdate = React.useCallback(() => updateState({}), []);

async function waitme(ft, x){
try{
await fetch(ft, {
               method: "GET",
               headers: { 'Content-Type': 'application/json' },
}).then((response) =>  response.json())
   .then(function(data) {
         let databy = "by " + data.by;
         let curdate = new Date();
         let fromdb = new Date(data.time);
          let curminutes = curdate.getMinutes() - fromdb.getMinutes();
         let datatimestamp = curminutes + " minutes ago | hide | past | discuss";
         
       let toprowspandata = data.text;
       let bottomrowspandata = databy + " " + datatimestamp;

    arrayfornew.current.push(<div key={x} className="commentslistfordata" >
<div className="commentstoprowdata">
<span className="commentstoprowspan">{toprowspandata}</span>
</div>
<div className="commentsbottomrowdata">
<span className="commentsbottomrowspan"> {bottomrowspandata} </span>
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

// firsttree array to accept array from first level kids array after found by for search
   let firsttree = [];
// secondtree array to accept array which is first level or second level kids array which is ready to query
// for json data from each elements
   let secondtree = [];

         for(let y=takenotes.current; y < 33259216; y++){
         let allsearch = "https://hacker-news.firebaseio.com/v0/item/" + y + ".json?print=pretty";

 await fetch(allsearch, {
               method: "GET",
               headers: { 'Content-Type': 'application/json' },
}).then((response) =>  response.json())
   .then(function(data) {
     if((data.kids) && (data.kids.length !== 0)){
             for(let w = 0; w < data.kids.length; w++){
                  firsttree.push(data.kids[w]);
}
}
});
   if(firsttree.length >= 30){
     takenotes.current = y;
      break;
}};


             for(let a = 0; a < 30; a++){
   let secondtreetest = "https://hacker-news.firebaseio.com/v0/item/" + firsttree[a] + ".json?print=pretty";    
          await fetch(secondtreetest, {    
               method: "GET",    
               headers: { 'Content-Type': 'application/json' },
}).then((response) =>  response.json())
   .then(function(data) {
// below if else to fill in secondtree array with data.kids array which firsttree kids array has another 
// child kids or not
         if((data.kids) && (data.kids.length !== 0)){
              secondtree.push(firsttree[a]);
              secondtree = [...secondtree, ...data.kids];
          }
        else {
           secondtree.push(firsttree[a]);
       }
 });
}


return secondtree;
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
if(props.count === 0){
     takenotes.current = 1;
}
lastcall();
}, [props.count]);

return(
<div className="commentsmiddlepageinside">
{arrayfornew.current}
</div>
);

} 

export default Comments;
