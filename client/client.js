const writeEvent = (text) => {
    //find event class on page
    const parent = document.querySelector('#events');
    //creates a new list element inside.
    const element = document.createElement('li')
    element.innerHTML = text;

    parent.appendChild(element);
};

writeEvent("Event test successful")

//establishes connection with the server
const soc = io();

soc.on('message', (text) => {
    writeEvent(text);
})