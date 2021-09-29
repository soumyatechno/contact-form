import { connectAdvanced } from "react-redux";

const initialState = [
    {
     id: 0,
     name: "Soumya",
     number: 2312213143,
     email:"abc@g.com"
    },
    {
        id: 1,
        name: "Sourav",
        number: 9824311314,
        email: "test@test.com"
    }

];

const contactReducer = (state=initialState, action) => {
    switch(action.type) {
        case "ADD_CONTACT":
            state=[...state, action.payload];
            return state;
        case "UPDATED_CONTACT":
            const updatedState = state.map(contact =>
                contact.id === action.payload.id ? action.payload : contact);
        state = updatedState;
        return state;
        case "DELETE_CONTACT":
            const filterContacts = state.filter(contact => contact.id !== action.payload && contact);
            state = filterContacts;
            return state;
        default:
            return state;
    }
};

export default contactReducer;