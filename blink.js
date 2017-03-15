import plural from './plural';

export default class Blink {
    constructor() {
        this.notifyCount = 0;
        this.notifyFocusTimer = null;
        this.title = document.title;  
    }

    run() {
        if (window.closed)
            return false;

        ++this.notifyCount;

        if (this.notifyFocusTimer) {
            clearInterval(this.notifyFocusTimer);
        }

        var title = '';
        switch (plural(this.notifyCount)) {
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

        title = this.notifyCount + ' ' + title;
        
        var self = this;

        this.notifyFocusTimer = setInterval(function () {

            if (window.closed) {
                clearInterval(self.notifyFocusTimer);
                return;
            }

            document.title = self.title != document.title ? self.title : title;
        }, 1000);

        document.onmousemove = function () {
            clearInterval(self.notifyFocusTimer);
            document.title = self.title;
            document.onmousemove = null;

            self.notifyCount = 0;
        };
    }
}