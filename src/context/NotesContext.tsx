import React, { createContext, useReducer, useContext, Children } from 'react';
// import Note from '../note';

// const initialState: Note = {
//     notes: []
// };


// const reducer = (state: Note, action: any) => {
//     switch(action.type) {
//         case 'add_note':
//             return [state, ...initialState];
//         default:
//             return state;
//     }
// };

const NotesContext = createContext(null);


// export const NotesProvider = ({ children }: { children: any }) => {
//     const [state, dispatch] = useReducer(reducer, initialState);
// }

export default NotesContext;