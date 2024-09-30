export interface Event {
    eventName:string,
    startDate:Date,
    endDate:Date,
    location:string,
    price:string,
    capacity:string,
    visibility:string,
    image:string
}
export interface EventContextType {
    events: Event[];
    addEvent: (event: Event) => void;
}
export interface EventsProps {
    children: React.ReactNode;
}
