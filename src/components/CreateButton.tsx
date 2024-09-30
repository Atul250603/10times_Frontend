function CreateButton({showForm,setShowForm}: {showForm:Boolean,setShowForm: Function}){

    return(
        <div className={`bg-slate-900 w-max p-2 rounded-full cursor-pointer transition ${(showForm)?"-rotate-45":"rotate-0"}`} onClick={()=>{setShowForm((prev:Boolean)=>(!prev))}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </div>
    )

}

export default CreateButton;