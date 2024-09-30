import { useContext, useEffect, useState } from "react";
import { EventContext } from "../context/rootContext";
import EventCard from "./EventCard";
import { Event } from "../Types";

function Events(){
    const [type,setType] = useState("upcoming");
    const context=useContext(EventContext);
    const [events,setEvents]=useState<Event[]>();
    useEffect(()=>{
        if(context && type==="upcoming"){
            setEvents(context.events?.filter((event)=>new Date(event.startDate).getTime()>=new Date().getTime()));
        }
        else if(context && type==="past"){
            setEvents(context.events?.filter((event)=>new Date(event.startDate).getTime()<new Date().getTime()));
        }
    },[context,type])
    return(
        <div className="">
            <div className="flex justify-between items-center">
                <div className="text-4xl font-bold">Events</div>
                <div>
                    <div className="flex w-max p-1 bg-slate-400 rounded-lg">
                        <div className={`px-2 py-1 rounded-lg font-semibold cursor-pointer ${(type==="upcoming")?"bg-gradient-to-r from-blue-200 to-white text-black":"text-white"}`} onClick={(type==="past")?()=>setType("upcoming"):()=>{}}>Upcoming</div>
                        <div className={`px-2 py-1 rounded-lg font-semibold cursor-pointer ${(type==="past")?"bg-gradient-to-r from-blue-200 to-white text-black":"text-white"}`} onClick={(type==="upcoming")?()=>setType("past"):()=>{}}>Past</div>
                    </div>
                </div>
            </div>


            <div>
                {
                    (events?.length)?events.map((event,index)=><EventCard index={index} event={event}/>):<div className="text-center text-2xl font-semibold mt-4">No events to show</div>
                }
            </div>
        </div>
    )
}

export default Events;