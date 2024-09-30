import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Event } from '../Types';
import { EventContext } from '../context/rootContext';
function EventForm({setShowForm}:{setShowForm:Function}) {
   
    type Value = Date|null;
    const [eventName,setEventName] = useState("");
    const [startDate,setStartDate] = useState<Value>(new Date());
    const [endDate,setEndDate] = useState<Value>(new Date());
    const [location,setLocation] = useState("");
    const [price,setPrice] = useState("0");
    const [capacity,setCapacity] = useState("Unlimited");
    const [visibility,setVisibility] = useState("Public");
    const [image,setImage] = useState<string|null>(null);
    const context=useContext(EventContext);
    const {addEvent}=context!;
    function uploadImage(event:React.ChangeEvent<HTMLInputElement>){
        try{
            const file=event.target.files![0];
            if(!file)throw "No file selected";
            if(!file.type.startsWith("image"))throw "Invalid file type";
            const imageUrl=URL.createObjectURL(file);
            setImage(imageUrl);
        }
        catch(error:any){
            toast.error(error);
        }
    }

    function createEvent(){
        try{
            if(!eventName || !startDate || !endDate || !location || !price || !capacity || !visibility || !image)throw "All fields are required";
            if(!eventName.trim().length) throw "Event Name is required";
            if(new Date(startDate).getTime()>=new Date(endDate).getTime())throw "Start Date should be before End Date";
            if(new Date(startDate).getTime()<=new Date().getTime())throw "Start Date should be a future date";
            if(!location.trim().length) throw "Location is required";
            if(isNaN(Number(price)))throw "Price should be a number";
            if(Number(price)<0)throw "Price should be greater than or equal to 0";
            if(isNaN(Number(capacity)) && capacity!=="Unlimited")throw "Capacity should either be a number or Unlimited";

            const event:Event={
                eventName:eventName,
                startDate:startDate,
                endDate:endDate,
                location:location,
                price:price,
                capacity:capacity,
                visibility:visibility,
                image:image
            }

            //make api call to store the event in the database

            addEvent(event);

            setEventName("");
            setStartDate(null);
            setEndDate(null);
            setLocation("");
            setPrice("0");
            setCapacity("Unlimited");
            setVisibility("Public");
            setImage(null);
            setShowForm(false);

        }
        catch(error:any){
            toast.error(error); 
        }
    }
    return (
        <div className='bg-white h-max w-full p-2 xs:p-4 rounded-lg shadow-lg shadow-slate-300 overflow-y-auto'>
            
            <div className='w-full h-auto lg:h-[80%] flex flex-col lg:flex-row items-stretch'>
            <div className='w-full lg:w-1/2'>
                <div className='w-full py-2'>
                    <input type="text" className='w-full text-3xl font-bold outline-none bg-transparent placeholder:text-slate-500' value={eventName} onChange={(e)=>setEventName(e.target.value)} name="Event Name" placeholder="Event Name" />
                </div>
                <div className='my-4 flex flex-col sm:flex-row gap-2'>
                    {(startDate && endDate)?<div className='flex items-center sm:justify-center sm:flex-col text-slate-500 w-full sm:w-[10%]'>
                        <div className='text-center'>
                            <div className='text-sm bg-slate-200 w-full text-center px-2 rounded-tl-md rounded-tr-md font-semibold'>{new Date(startDate).toLocaleString('default',{month:'long'}).substring(0,3)}</div>
                            <div className='font-bold px-2 border border-slate-200 rounded-br-md rounded-bl-md'>{new Date(startDate).getDate()}</div>
                        </div>
                        <div className='w-full flex justify-center h-full'>
                            <div className='w-full sm:w-auto border-dashed border-2 border-slate-600 border h-full'>

                            </div>
                        </div>
                        <div className='text-center'>
                            <div className='text-sm bg-slate-200 w-full text-center px-2 rounded-tl-md rounded-tr-md font-semibold'>{new Date(endDate).toLocaleString('default',{month:'long'}).substring(0,3)}</div>
                            <div className='font-bold px-2 border border-slate-200 rounded-br-md rounded-bl-md'>{new Date(endDate).getDate()}</div>
                        </div>
                    </div>:<></>}
                    <div className='w-full bg-slate-200 p-2 xs:p-4 rounded-xl text-slate-600 '>
                        <div className='sm:flex gap-4 mb-4'>
                            <div className='font-semibold text-xl w-1/4'>Start</div>
                            <div className='mt-3 sm:mt-0 w-full'>
                                <DateTimePicker onChange={setStartDate} value={startDate} className={"w-full"}/>
                            </div>
                        </div>
                        <div className='sm:flex gap-4 justify-between'>
                            <div className='font-semibold text-xl w-1/4'>End</div>
                            <div className='mt-3 sm:mt-0 w-full'>
                                <DateTimePicker onChange={setEndDate} value={endDate} className={"w-full"}/>
                            </div>
                        </div>
                        <div className='flex mt-3 items-center text-slate-500 font-semibold gap-1'>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                                </svg>
                            </div>
                            <div>GMT +5:30 Calcutta</div>
                        </div>
                    </div>
                </div>

                <div className='flex gap-2 my-4 justify-between'>
                    <div className='rounded-lg border-2 border-slate-300 flex items-center justify-center w-[10%]'>
                        <div className='text-slate-500'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                        </div>
                    </div>
                    <div className='bg-slate-200 p-1 xs:p-2 rounded-xl w-full'>
                        <div>
                            <input type="text" className='w-full outline-none bg-transparent font-semibold placeholder:text-slate-500' name="location" value={location} onChange={(e)=>setLocation(e.target.value)} placeholder='Add Event Location' />
                        </div>
                    </div>
                </div>

                <div>
                    <div className='text-xl font-semibold text-slate-500'>Event Options</div>
                    <div className='bg-slate-200 p-1 xs:p-4 rounded-xl mt-3'>
                        <div className='flex justify-between w-full p-2 items-center'>
                            <div className='flex gap-1 items-center text-slate-600'>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                                    </svg>
                                </div>
                                <div className='font-bold text-xl'>Tickets</div>
                            </div>
                            <div className="w-[40%] flex gap-1 text-slate-500 font-semibold">
                                Rs. <input type="text" className="w-full outline-none bg-transparent font-semibold" name="price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
                            </div>
                        </div>
                        <div className='flex justify-between w-full p-2 items-center'>
                            <div className='flex gap-1 items-center text-slate-600'>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                                    </svg>
                                </div>
                                <div className='font-bold text-xl'>Capacity</div>
                            </div>
                            <div className="w-[40%]">
                                <input type="text" className="w-full outline-none bg-transparent font-semibold text-slate-500" name="capacity" value={capacity} onChange={(e)=>setCapacity(e.target.value)}/>
                            </div>
                        </div>
                        <div className='flex justify-between w-full p-2 items-center'>
                            <div className='flex gap-1 items-center text-slate-600'>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                                    </svg>
                                </div>
                                <div className='font-bold text-xl'>Visibility</div>
                            </div>
                            <div className="w-[40.5%]">
                                <select className="w-full outline-none font-semibold bg-transparent text-slate-500" onChange={(e)=>setVisibility(e.target.value)}>
                                    <option value="Public" defaultChecked>Public</option>
                                    <option value="Private">Private</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full lg:w-1/2 flex-grow '>
                <div className='w-full h-full my-4 lg:my-0  flex justify-center'>
                <label htmlFor='dropzone-file' className='cursor-pointer w-1/2 h-full flex flex-col items-center justify-center'>
                    {(!image)?<div className='lg:h-1/2 border-dashed border-2 w-full border-slate-400 rounded-xl p-2 flex flex-col items-center justify-center text-slate-500'>
                        <div className='mb-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                            </svg>
                        </div>
                        <div className='text-center'>
                            <span className='font-bold'>Click</span> to upload Event Image
                        </div>
                    </div>:
                    <div className='w-full text-center h-1/2'>
                        <div className='h-[200px]'>
                            <div className='h-full'><img src={image} alt="Event" className='h-full block mx-auto border-2 border-black rounded-xl'/></div>
                        </div>
                        <div className='mt-3 font-bold'>Event Image</div>
                    </div>}
                    <input id="dropzone-file" type="file" accept='image/*' className="hidden" onChange={(e)=>uploadImage(e)} />
                </label>
                </div>
            </div>
        </div>
        <div className='w-full flex justify-center mt-3'>
            <div className='bg-black p-2 rounded-lg cursor-pointer font-semibold text-white' onClick={createEvent}>
                Create Event
            </div>
        </div>
    </div>
    )
}

export default EventForm;