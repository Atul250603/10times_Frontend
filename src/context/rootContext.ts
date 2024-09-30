import { createContext } from "react";
import { EventContextType } from "../Types";
export const EventContext=createContext<EventContextType | undefined>(undefined);