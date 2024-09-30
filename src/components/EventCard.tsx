import { Event } from "../Types";

function EventCard({ index, event }: { index: number, event: Event }) {
  return (
    <div key={index} className="w-full flex justify-center my-4">
      <div className="w-full lg:w-3/4 sm:flex gap-4">
        <div className='flex flex-row mb-2 sm:mb-0 sm:flex-col items-center sm:justify-center text-slate-500 w-full sm:w-[10%]'>
          <div className='text-center'>
            <div className='text-sm bg-slate-500 w-full text-center px-2 rounded-tl-md rounded-tr-md font-semibold text-white'>{new Date(event.startDate).toLocaleString('default', { month: 'long' }).substring(0, 3)}</div>
            <div className='font-bold px-2 border-2 border-slate-500 rounded-br-md rounded-bl-md'>{new Date(event.startDate).getDate()}</div>
          </div>
          <div className='flex justify-center w-full h-full'>
            <div className='w-full sm:w-auto border-dashed border-2 border-slate-600 border h-full'>

            </div>
          </div>
          <div className='text-center'>
            <div className='text-sm bg-slate-500 w-full text-center px-2 rounded-tl-md rounded-tr-md font-semibold text-white'>{new Date(event.endDate).toLocaleString('default', { month: 'long' }).substring(0, 3)}</div>
            <div className='font-bold px-2 border-2 border-slate-500 rounded-br-md rounded-bl-md'>{new Date(event.endDate).getDate()}</div>
          </div>
        </div>
        <div className="flex justify-between bg-white rounded-xl p-2 shadow-lg shadow-slate-300 w-full">
          <div className="w-[70%] p-2">
            <div className="text-slate-500 font-semibold">{new Date(event.startDate).toLocaleTimeString('default', { hour: "2-digit", minute: "2-digit" })}</div>
            <div className="text-2xl font-bold my-2">{event.eventName}</div>
            <div className="flex gap-2 items-center text-slate-500 mb-2">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </div>
              <div>{event.location}</div>
            </div>

            <div className="flex gap-2 items-center text-slate-500 mb-2">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                </svg>
              </div>
              <div>
                {Number(event.price) === 0 ? "Free" : `Rs. ${event.price}`}
              </div>
            </div>

            <div className="flex gap-2 items-center text-slate-500 mb-2">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
              </div>
              <div>
                {event.capacity} User Capacity
              </div>
            </div>

            <div>
              <div className="w-max bg-blue-600 text-white font-semibold px-2  rounded-lg">{event.visibility}</div>
            </div>

          </div>

          <div className="w-[40%] p-2 flex justify-center items-center">
            <div className="h-[150px] xs:h-[200px]">
              <img src={event.image} className="rounded-lg shadow h-full" alt="Event" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard