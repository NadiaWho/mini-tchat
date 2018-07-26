import WebSocket from 'ws'

const wss = new WebSocket.Server({ port: 8080 })


const animals = [ 'lama', 'rabbit', 'horse', 'dinosaur', 'whale' ]
const adjectives = [ 'savage', 'nice', 'wise', 'powerfull', 'elastic', 'crazy' ]
const colors = [ 'blue', 'red', 'hotpink', 'grey', 'black', 'green' ]

const getRandom = arr => arr[Math.floor(Math.random() * arr.length)]

const users = new Set
const history = []


wss.on('connection', ws => {
    const id = `${getRandom(adjectives)}-${getRandom(colors)}-${getRandom(animals)}`
    const user = { id, ws }
    ws.on('message', content => {
        history.push({ sender: id, content })
        const message = JSON.stringify({ sender: id, content })
        for (const user of users) {
            user.ws.send(message)
        }
    })
    users.add(user)
    ws.on('close', () => users.delete(user))
    ws.send(JSON.stringify({ id, messages: history }))
})

