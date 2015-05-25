exports.profile = {

        color: '#2ECC40',

        avatarurl: 'http://107.161.19.15:8000',

        avatar: function (online, user, img) {
            if (online === true) {
                if (typeof (img) === typeof ('')) {
                    return '<img src="' + this.avatarurl + '/avatars/' + img + '" width="80" height="80" align="left">';
                }
                return '<img src="http://play.pokemonshowdown.com/sprites/trainers/' + img + '.png" width="80" height="80" align="left">';
            }
            for (var name in Config.customAvatars) {
                if (user === name) {
                    return '<img src="' + this.avatarurl + '/avatars/' + Config.customAvatars[name] + '" width="80" height="80" align="left">';
                }
            }
            var trainersprites = [1, 2, 101, 102, 169, 170, 265, 266, 168];
            return '<img src="http://play.pokemonshowdown.com/sprites/trainers/' + trainersprites[Math.floor(Math.random() * trainersprites.length)] + '.png" width="80" height="80" align="left">';
        },

        name: function (online, user) {
            if (online === true) {
                return '&nbsp;<strong><font color="' + this.color + '">Name:</font></strong>&nbsp;' + user.name;
            }
            return '&nbsp;<strong><font color="' + this.color + '">Name:</font></strong>&nbsp;' + user;
        },

        group: function (online, user) {
            if (online === true) {
                if (user.group === ' ') {
                    return '<br>&nbsp;<strong><font color="' + this.color + '">Group:</font></strong>&nbsp;' + 'Regular User';
                }
                return '<br>&nbsp;<strong><font color="' + this.color + '">Group:</font></strong>&nbsp;' + Config.groups[user.group].name;
            }
            var g = Core.stdin('usergroups', user);
            if (g === 0) {
                return '<br>&nbsp;<strong><font color="' + this.color + '">Group:</font></strong>&nbsp;' + 'Regular User';
            }
            return '<br>&nbsp;<strong><font color="' + this.color + '">Group:</font></strong>&nbsp;' + Config.groups[g].name;
        },

        lastSeen: function (online, user) {
            var lastSeen;

            if (online === true) {
                if (user.connected === true) {
                    return '<br>&nbsp;<strong><font color="' + this.color + '">Last Seen:</font></strong>&nbsp;<font color="green">Current Online</font>';
                }
                lastSeen = Number(Core.stdin('lastSeen', user.userid));
            } else {
                lastSeen = Number(Core.stdin('lastSeen', user));
            }

            if (lastSeen === 0) return '<br>&nbsp;<strong><font color="' + this.color + '">Last Seen:</font></strong>&nbsp;Never';

            var seconds = Math.floor((Date.now() - lastSeen) * 0.001);
            var minutes = Math.floor((Date.now() - lastSeen) * 1.6667e-5);
            var hours = Math.floor((Date.now() - lastSeen) * 2.7778e-7);
            var days = Math.floor(((Date.now() - lastSeen) * 2.7778e-7) / 24);

            var time = days + ' days ago';

            if (seconds < 60) {
                if (seconds === 1) {
                    time = seconds + ' second ago';
                } else {
                    time = seconds + ' seconds ago';
                }
            } else if (minutes < 60) {
                if (minutes === 1) {
                    time = minutes + ' minute ago';
                } else {
                    time = minutes + ' minutes ago';
                }
            } else if (hours < 24) {
                if (hours === 1) {
                    time = hours + ' hour ago';
                } else {
                    time = hours + ' hours ago';
                }
            } else if (days === 1) {
                time = days + ' day ago';
            }

            return '<br>&nbsp;<strong><font color="' + this.color + '">Last Seen:</font></strong>&nbsp;' + time;
        },

        about: function (user) {
            return Core.stdin('about', user);
        },
