import React from 'react' 
import GlobalContextProvider from './src/context/GlobalContextProvider'

export  const wrapRootElement = ({ element }) => {
    return  <GlobalContextProvider>{element}</GlobalContextProvider>  
}

export const onServiceWorkerUpdateReady = () => {
   
  const answer = window.confirm(
    `This tutorial has been updated. ` +
      `Reload to display the latest version?`
  )
  if (answer === true) {
    window.location.reload()
  }
}