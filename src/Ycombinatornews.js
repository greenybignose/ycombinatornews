import React, {useState, useRef} from 'react';
import './Ycombinatornews.css';
import New from './New';
import Comments from './Comments';
import Ask from './Ask';
import Job from './Job';
import Poll from './Poll';
import Vertical from './Vertical';

const Ycombinatornews = () => {

const counted = useRef(0);

 const [, updateState] = React.useState();
 const forceUpdate = React.useCallback(() => updateState({}), [])

// every component which is not rendered yet will be hide first from it's div elements. This is what 
// components state job
const [components, setComponents] = useState({neww: "newcompshow", poll: "pollcomphid", 
comments: "commentscomphid", ask: "askcomphid", job: "jobcomphid"});


const handleClicknew = (event) => {
      event.preventDefault();
      if (counted.current !== 0) {
         counted.current = 0;
      }
    if(components.neww === "newcomphid"){
      let newcomponents = {neww: "newcompshow", poll: "pollcomphid", comments: "commentscomphid",
ask: "askcomphid", job: "jobcomphid" };    
        setComponents(newcomponents);
}
   };

const handleClickpoll = (event) => {
      event.preventDefault();
      if (counted.current !== 0) {
         counted.current = 0;
      }
    if(components.poll === "pollcomphid"){
      let newcomponents = {neww: "newcomphid", poll: "pollcompshow", comments: "commentscomphid",
ask: "askcomphid", job: "jobcomphid" };    
        setComponents(newcomponents);
}
}

const handleClickcomments = (event) => {

      event.preventDefault();
      if (counted.current !== 0) {
         counted.current = 0;
      }
    if(components.comments === "commentscomphid"){
      let newcomponents = {neww: "newcomphid", poll: "pollcomphid", comments: "commentscompshow",
ask: "askcomphid", job: "jobcomphid" };    
        setComponents(newcomponents);
}
}


const handleClickask = (event) => {

      event.preventDefault();
      if (counted.current !== 0) {
         counted.current = 0;
      }
    if(components.ask === "askcomphid"){
      let newcomponents = {neww: "newcomphid", poll: "pollcomphid", comments: "commentscomphid",
ask: "askcompshow", job: "jobcomphid" };    
        setComponents(newcomponents);
}
}

const handleClickjobs = (event) => {

      event.preventDefault();
      if (counted.current !== 0) {
         counted.current = 0;
      }
    if(components.job === "jobcomphid"){
      let newcomponents = {neww: "newcomphid", poll: "pollcomphid", comments: "commentscomphid",
ask: "askcomphid", job: "jobcompshow" };    
        setComponents(newcomponents);
}
}

const handleClickmore = (event) => {
    event.preventDefault();
    counted.current = counted.current + 1;
   forceUpdate()
}

return (
<div className="maindiv">
<div className="leftdiv">
</div>
<div className="middlediv">
<div className="banner">
<div className="leftsidebanner">
  <button className="hackernewsbutton">Hacker News</button> 
    <button className="newbutton"  onClick={(e) => handleClicknew(e)} >new</button> 
       <Vertical />

    <button className="pollbutton"   onClick={(e) => handleClickpoll(e)}>poll</button> 

        <Vertical />
         <button className="commentsbutton"  onClick={(e) => handleClickcomments(e)}>comments</button> 
       <Vertical />
         <button className="askbutton"  onClick={(e) => handleClickask(e)}>ask</button> 
         <Vertical />
         <button className="jobsbutton" onClick={(e) => handleClickjobs(e)}>jobs</button> 
 
 </div> {/* closing for leftsidebanner */}
</div> {/* closing for banner */}
<div className="middlepage">
<div className={components.neww} >
<New count={counted.current} />
</div>
<div className={components.poll} >
<Poll count={counted.current} runornot={components.poll} />{/* this runornot props to avoid apps to hang
when initially loaded cause poll will search on very big data from network even when initially loaded */}
</div>
<div className={components.comments} >
<Comments count={counted.current} />
</div>
<div className={components.ask} >
<Ask count={counted.current} />
</div>
<div className={components.job} >
<Job count={counted.current} />
</div>
<div className="morebuttondiv">
<button className="morebutton" onClick={(e) => handleClickmore(e)}>more...</button>
</div>
</div> {/* closing for middlepage */ }
</div> {/* closing for middlediv */}
<div className="rightdiv">
</div>
</div>       
     );
}

export default Ycombinatornews;
