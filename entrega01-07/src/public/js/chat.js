// Obtener referencias a los elementos del DOM
const form = document.getElementById('form');
const inputUser = document.getElementById('inputUser');
const inputText = document.getElementById('inputText');
const messagesContainer = document.getElementById('messages');
// Función para hacer scroll hacia abajo en el div de mensajes
function scrollToBottom() {
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Conectar con el servidor de socket.io
const socket = io();
socket.on("getMessages", (messages) => {
  messagesContainer.innerHTML = ''
  messages.forEach(message => {
    const { user, message: text } = message;
    console.log(message)
    messagesContainer.innerHTML += `<div class="message"><span>${user}:</span> <span>${text}</span></div>`;
  })
})
let myUsername
async function asyncWraper() {
  const { value: myUsernameIngresado } = await Swal.fire({
    title: 'Ingresa tu username',
    input: 'text',
    inputLabel: 'Tu username',
    inputValue: '',
    showCancelButton: false,
    allowOutsideClick: false,
    inputValidator: (value) => {
      if (!value) {
        return 'Por favor completar';
      }
    },
  });
  myUsername = myUsernameIngresado;
}

asyncWraper();
// Evento cuando se envía el formulario
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Evitar el envío del formulario por defecto

  //const user = inputUser.value; // Obtener el nombre de usuario deseado
  const text = inputText.value; // Obtener el texto del mensaje

  // Emitir el evento al servidor con los datos del mensaje
  if (!myUsername && !text || text === '') return
  socket.emit('chatMessage', { user: myUsername, message: text });

  inputText.value = ''; // Limpiar el campo de entrada
});

// Evento cuando se recibe un nuevo mensaje desde el servidor
socket.on('getAllMessages', (messages) => {
  console.log("getAllMessages socket on")
  messagesContainer.innerHTML = ""
  messages.forEach(message => {
    const { user, message: text } = message;
    messagesContainer.innerHTML += `<div class="message"><span>${user}:</span> <span>${text}</span></div>`;
  })
  scrollToBottom();
});
scrollToBottom();
