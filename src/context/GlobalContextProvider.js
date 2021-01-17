import React from 'react'

export const GlobalStateContext = React.createContext()
export const GlobalDispatchContext = React.createContext()

const initalState = {
    theme: 'light',
    linklist: []
}

function reducer(state, action) {
    switch (action.type) {
        case 'TOGGLE_THEME': {
            return {
                ...state,
                theme: state.theme === 'light' ? 'dark' : 'light'
            }
        }
        case 'LINK_THEME':  
            console.log('link theme');
            console.log(action.data);
            return {
                ...state,
                linklist: [...state.linklist, action.data]
            } 
        default:
            throw new Error('Bad Action Type')
    }

}
const GlobalContextProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initalState);
    return (
        <GlobalStateContext.Provider value={state}>
            <GlobalDispatchContext.Provider value={dispatch}>
                {children}
            </GlobalDispatchContext.Provider>
        </GlobalStateContext.Provider>
    )
}

export default GlobalContextProvider
