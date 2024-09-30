import {EventContext}  from "./rootContext"
import { Event,EventContextType,EventsProps } from "../Types"
import { useState } from "react"
import toast from "react-hot-toast";
export default function Events(props:EventsProps){
    const [events,setEvents]=useState<Event[]>([]);
    const addEvent=(event:Event)=>{
        try{
            setEvents((prev)=>[...prev,event]);
            console.log(events);
            toast.success("Event added successfully");
        }
        catch(error:any){
            toast.error("Failed to add event");
        }
    }
    const eventData:EventContextType={
        events,
        addEvent
    }
    return(
        <EventContext.Provider value={eventData}>
            {props.children}
        </EventContext.Provider>

    )
}