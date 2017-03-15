'use strict';

import _isFunction from 'lodash/isFunction';
import _isObject from 'lodash/isObject';

export default class Socket {
    constructor() {
        this.ws = null;
        this.connection = false;
        this.connecting = false;
    }

    close() {
        if (this.ws !== null)
            this.ws.close();

        this.connection = false;
        this.connecting = false;
        this.ws = null;
    }

    /**
     * @param {Function} default_action действие которое выполнится сразу после открытия соединения 
     */
    open(href, default_action) {
        this.connecting = true;
        this.href = href;

        try {
            this.ws = new WebSocket(href);
            this.ws.onopen = () => {
                this.connection = true;
                this.connecting = false;

                if (default_action && _isFunction(default_action)) {
                    default_action();
                }

                console.info("[socket] connected", href);
            };
            this.ws.onclose = () => {
                this.close();
                console.info("[socket] disconnected");
            };
            this.ws.onerror = (error) => {
                this.close();
                console.error("[socket]", error);
            };
        } catch (e) {
            this.close();
            console.error("[socket]", e);
        }
    }

    send(msg) {

        if (!this.isConnected()) {
            // нет проверки на количество попыток
            var self = this;
            setTimeout(() => {
                self.open(this.href, () => {
                    self.send(msg)
                });
            }, 400); // через 400 мс пытаемся долбиться снова и отправить сообщение

            return false;
        }
        
        if(_isObject(msg) || !msg.pathname) { // что бы нам не городить огороды и проверять только нужноее
            msg.pathname = window.location.pathname;
        }

        console.log('[socket] send', msg);
        this.ws.send(_isObject(msg) ? JSON.stringify(msg) : msg);

        return true;
    }

    isConnected() {
        return (this.ws !== null && this.connection === true);
    }

    isConnecting() {
        return (this.ws !== null && this.connecting === true);
    }

    message(callback) {
        this.ws.onmessage = callback;
    }
}