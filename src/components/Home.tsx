import { useState } from "react";
import CreateButton from "./CreateButton";
import EventForm from "./EventForm";
import Events from "./Events";

function Home(){
    const [showForm, setShowForm] = useState(false);
    return(
        <div className="relative min-h-screen w-full bg-gradient-to-r from-blue-200 to-white">
            <div className="p-2">
                <Events/>
            </div>
            <div className={`fixed top-0 flex justify-center backdrop-blur-sm items-center w-full h-screen z-10 transition ${(showForm)?"opacity-100 scale-100":"opacity-0 scale-95 pointer-events-none"}`}>
                <div className="w-[95%] xs:w-[85%] h-[85vh] overflow-y-auto">
                    <EventForm setShowForm={setShowForm}/>
                </div>
            </div>
            <div className="z-20 fixed bottom-[8%] right-10">
                <CreateButton showForm={showForm} setShowForm={setShowForm}/>
            </div>
        </div>
    )
}

export default Home;