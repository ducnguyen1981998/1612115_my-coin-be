let socket = io();

socket.on('connect', () => {
    console.log('Connected to server');

    socket.emit('createMessage',{
        from: 'Duc',
        text: 'Hello'
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from server')
});

socket.on('newMessage', (message) => {
    console.log('NewMessage', message)
});

