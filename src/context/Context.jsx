import React, { createContext, useState } from 'react'
export const addProjectResponseContext = createContext()
export const editprojectResponseContext = createContext()

export default function Context({ children }) {
  const [addProjectResponse, setAddProjectResponse] = useState({})
  const [editprojectResponse, seteditprojectResponse] = useState({})
  return (
    <>
      <addProjectResponseContext.Provider value={{ addProjectResponse, setAddProjectResponse }}>
        <editprojectResponseContext.Provider value={{editprojectResponse, seteditprojectResponse}}>
          {children}
        </editprojectResponseContext.Provider>
      </addProjectResponseContext.Provider>

    </>
  )
}
