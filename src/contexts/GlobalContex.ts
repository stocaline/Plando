import { createContext, useContext, useState } from "react";
import { TaskProps } from "../@types/task";

export type GlobalContent = {
    tasksList: TaskProps[]
    setTasksList:(c: TaskProps[]) => void
  }

export const GlobalContext = createContext<GlobalContent>({
    tasksList: [], 
    setTasksList: () => {},
})

export const useGlobalContext = () => useContext(GlobalContext)