# helpers.js

Небоьлшой набор классов помошников, который я использую в повседневной работе.  
В нетороых классах используется библиотека [Lodash](https://lodash.com/)

## blink.js
Моргает заголовом окна уведомля о количестве "новых сообщений", как вконтакте

```JS
import Blink from './helpers.js/blink';
let blick = new Blink();

function recvMessage() { ...
	blink.run();
	...
}
```

## notify.js
Небольшая обертка над [Notification](https://developer.mozilla.org/ru/docs/Web/API/notification)

```JS
import Notify from './helpers.js/notify';
let notify = new Notify();

notify.send(message.type, message.title, message.text);

```

## plural.js
Функция возвращает форму множественного числа для русского языка, [формулы для других языков](http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html?id=l10n/pluralforms)

```JS
import plural from './helpers.js/plural';

let title = '';
switch (plural(notifyCount)) {
    case 0:
        title = 'Новое сообщение';
        break;
    case 1:
        title = 'Новых сообщения';
        break;
    case 2:
        title = 'Новых сообщений';
        break;
}

```

## socket.js
Небольшая обертка над [WebSocket](https://developer.mozilla.org/ru/docs/Web/API/WebSocket)
