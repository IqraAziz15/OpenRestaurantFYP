import Pusher from 'pusher-js';

export var pusher = new Pusher('pusherkey', {
    cluster: 'ap2'
  });