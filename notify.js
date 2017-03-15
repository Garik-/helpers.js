'use strict';

export default class Notify {
    constructor() {
        this.permission = null;
        var self = this;

        if (!("Notification" in window)) // можно варнинг показывать например
            return false;

        if (!('permission' in Notification) || Notification.permission === 'default') {
            Notification.requestPermission(function (permission) {

                if (!('permission' in Notification)) {
                    Notification.permission = permission;
                }

                self.permission = permission;
            });
        } else {
            this.permission = Notification.permission;
        }
    }

    send(tag, title, body, icon) {
        
        console.log('notify.send');
        
        if ("granted" !== this.permission)
            return null;

        var options = { tag: tag };
        
        if (body) {
            options.body = body;
        }
        if (icon) {
            options.icon = icon;
        }

        return new Notification(title, options);
    }
}


