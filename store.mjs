// Initial State
const initialState = {
    id: '',
    messages: []
}
// Reducer

// Reducer decrit les changements possible du state
const reducer = (state, action) => {
    if (action.type === 'SET_ID') {
        return {
            ...state,
            id: action.id,
            messages: action.messages
        }
    }
    if (action.type === 'ADD_MESSAGE') {
        return {
            ...state,
            messages: [
                ...state.messages,
                {
                    sender: action.sender,
                    receiver: action.receiver,
                    content: action.content,
                    date: Date.now()
                }
            ]
        }
    }
}

let notifyListeners
export const subscribe = callback => notifyListeners = callback

let currentState = initialState
const dispatch = action => {
    currentState = reducer(currentState, action)
    if (typeof notifyListeners === 'function') {
        notifyListeners()
    }
}

// actions
export const getState = () => currentState

export const addMessage = ({ sender, receiver, content }) =>
    dispatch({ type: 'ADD_MESSAGE', sender, receiver, content })

export const initConnection = ({ id, messages }) =>
    dispatch({ type: 'SET_ID', id, messages })

