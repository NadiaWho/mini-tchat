import { getState, initConnection, addMessage, subscribe } from './store.mjs'

const ws = new WebSocket(`ws://${window.location.hostname}:8080`)

ws.addEventListener('message', event => {
    console.log('message JSON du server', event)
    const data = JSON.parse(event.data)
    console.log('data du message', data)
    if (!getState().id) {
        initConnection(data)
    } else {
        addMessage(data)
    }
})

export const sendMessageToServer = content => ws.send(content)