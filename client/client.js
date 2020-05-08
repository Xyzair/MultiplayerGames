const writeEvent = (text) => {
    //find event class on page
    const parent = document.querySelector('#events');
    //creates a new list element inside.
    const element = document.createElement('li')
    element.innerHTML = text;

    parent.appendChild(element);
};

const onFormSubmitted = (e) => {
    e.preventDefault();

    //Find the chat box input
    const input = document.querySelector('#chat');
    //Store value from chat box.
    const text = input.value;

    //Clear input value on front end.
    input.value = '';
    console.log('text: ' + text);

    //Send message to server
    sock.emit('message', text);
};

writeEvent("Page successfully fetch and Javascript successfully loaded");

//establishes connection with the server
const sock = io();

sock.on('message', (text) => {
    writeEvent(text);
})

document
    .querySelector('#chat-form')
    .addEventListener('submit', onFormSubmitted);