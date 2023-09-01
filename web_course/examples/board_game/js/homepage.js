function main() {
  // https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
  // Create WebSocket connection.
  const webSocket = new WebSocket(`ws://${window.location.host}`);
  const nickname = window.localStorage.getItem('nickname');

  // Connection opened
  webSocket.addEventListener('open', function (event) {
    if (nickname) {
      const message = {
        type: 'playerAnnouncement',
        nickname,
        screen: 'home',
      };
      webSocket.send(JSON.stringify(message));
    }
  });

  // Listen for messages
  webSocket.addEventListener('message', function (event) {
      console.log('Message from server ', event.data);
  });

  webSocket.addEventListener('error', (event) => {
    console.error(event);
  });

  webSocket.addEventListener('close', (event) => {
    console.log(event);
  });

  const nicknameElement = document.getElementById('nickname');
  console.assert(nicknameElement);
  if (nickname) {
    nicknameElement.value = nickname;
  }

  nicknameElement.addEventListener('input', () => {
    window.localStorage.setItem('nickname', nicknameElement.value);
  })
}

window.addEventListener('load', main);