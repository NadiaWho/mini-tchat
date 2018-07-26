// Initial State

const initialState = {
    messages: []
}

// Store

// Store contient le state

// Reducer

// Reducer decrit les changements possible du state

const reducer = (state, action) => {
    if (action.type === 'NEW_CHAT') {
        return {
            messages: [
                ...state.messages,
                {
                    sender: 'computer',
                    receiver: action.receiver,
                    content: `You started a new conversation with ${action.receiver}`,
                    date: Date.now()
                },
            ]
        }
    }
    if (action.type === 'ADD_MESSAGE') {
        return {
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

console.log('avant', initialState)

let currentState = initialState
let i = 0

currentState = reducer(currentState, {
    type: 'NEW_CHAT',
    receiver: 'kikouroxx93'
})

const intervalId = setInterval(() => {
    i = i + 1
    currentState = reducer(currentState, {
        type: 'ADD_MESSAGE',
        sender: 'clement',
        receiver: 'kikouroxx93',
        content: 'salut, asv ???'
    })

    console.log(i)
    console.log('apres', currentState)
    if (i > 3) {
        clearInterval(intervalId)
    }
}, 2000)

