import React, { createContext, useReducer, useContext } from "react";
import { AUTH_SET_LOGGED_OUT, AUTH_SET_LOGGED_IN, USER_PET } from "./actions";

const StoreContext = createContext({
    userLoggedIn: false,
    email: "",
    username: "",
    petInformation: []
});
const { Provider } = StoreContext;

// This is a PURE function that takes in an action and creates the next state
// whenever a new action is "dispatched", the GlobalStore will update and the whole application will re-render.
const reducer = (state, action) => {
    switch(action.type){
        case AUTH_SET_LOGGED_IN:
            return {
                ...state,
                userLoggedIn: true,
                email: action.data.email,
                username: action.data.username,
                petInformation: action.data.petInformation
            }
        case AUTH_SET_LOGGED_OUT:
            return {
                ...state,
                userLoggedIn: false,
                email: "",
                username: "",
                petInformation: []
            }
        case USER_PET:
            return {
                ...state,
                petInformation: action.data.petInformation
            }
        default:
            return state;
    }
}

// Setup the provider component for our apps store
const StoreProvider = ({value, ...props}) => {
    // What the react app view model starts as
    const initialState = value || {
        userLoggedIn: false,
        email: "",
        username: "",
        petInformation: []
    };
    const [state, dispatch] = useReducer(reducer, initialState)
    window.dispatch = dispatch;
    return <Provider value={[state, dispatch]} {...props} />
}

// Create a custom hook for using our GlobalStore so the components don't have to hand implement theme
const useStoreContext = () => {
    return useContext(StoreContext);
}

export { StoreProvider, useStoreContext };