import { getState, subscribe } from './store.mjs'
import { sendMessageToServer } from './api.mjs'

const messages = document.getElementById('messages')
const formElem = document.getElementById('message-form')
const inputElem = document.getElementById('message-input')

formElem.addEventListener('submit', event => {
    event.preventDefault()

    sendMessageToServer(inputElem.value)

    inputElem.value = ''
})

const Message = props => `
    <div class="message">
        <div class="sender">${props.sender}</div>
        <div class="content">${props.content}</div>
    </div>
`

subscribe(() => {
    const state = getState()
    console.log(state)
    messages.innerHTML = state.messages.map(Message)
        .join('')
    console.log('state changes !!', state)
})

