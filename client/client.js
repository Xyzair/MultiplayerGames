const writeEvent = (text) => {
  //find event class on page
  const parent = document.querySelector("#events");
  //creates a new list element inside.
  const element = document.createElement("li");
  element.innerHTML = text;

  parent.appendChild(element);
};

const onFormSubmitted = (e) => {
  e.preventDefault();

  //Find the chat box input
  const input = document.querySelector("#chat");
  //Store value from chat box.
  const text = input.value;

  //Clear input value on front end.
  input.value = "";
  console.log("entered text: " + text);

  //Send message to server
  sock.emit("message", text);
};

const addButtonListenersTTT = () => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      document
        .getElementById("ttt" + i + "-" + j)
        .addEventListener("click", () => {
          sock.emit("message", i + "-" + j);
          console.log("Button pressed " + i + ", " + j);
        });
    }
  }
};

writeEvent("Page successfully fetched and Javascript successfully loaded");

//establishes connection with the server
const sock = io();

sock.on("message", (text) => {
  writeEvent(text);
});

document
  .querySelector("#chat-form")
  .addEventListener("submit", onFormSubmitted);

// document.getElementById('ttt' + 2 +"-" + 2)
// .addEventListener('click', () => {
//     sock.emit('message', '2-2');
//     console.log("Button pressed " + 2 + ", " + 2)
// });

// document.getElementById('ttt' + 0 +"-" + 1)
// .addEventListener('click', () => {
//     sock.emit('message', 0 +"-" + 1);
//     console.log("Button pressed " + 0 + ", " + 1)
// });

addButtonListenersTTT();
