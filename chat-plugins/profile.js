exports.commands = {
    atm: 'profile',
    profile: function (target, room, user, connection, cmd) {
        if (!this.canBroadcast()) return;
        if (cmd === 'atm') return this.sendReply('Use /profile instead.');
        if (target.length >= 19) return this.sendReply('Usernames are required to be less than 19 characters long.');

        var targetUser = this.targetUserOrSelf(target);

        if (!targetUser) {
            var userId = toId(target);
            var money = econ.money.get(user);
            var elo = profile.tournamentElo(userId);
            var about = profile.about(userId);

            if (elo === 1000 && about === 0) {
                return this.sendReplyBox(profile.avatar(false, userId) + profile.name(false, userId) + profile.group(false, userId) + profile.lastSeen(false, userId) + profile.display('money', money) + '<br clear="all">');
            }
            if (elo === 1000) {
                return this.sendReplyBox(profile.avatar(false, userId) + profile.name(false, userId) + profile.group(false, userId) + profile.display('about', about) + profile.lastSeen(false, userId) + profile.display('money', money) + '<br clear="all">');
            }
            
            if (about === 0) {
                return this.sendReplyBox(profile.avatar(false, userId) + profile.name(false, userId) + profile.group(false, userId) + profile.lastSeen(false, userId) + profile.display('money', money) + profile.display('elo', elo, profile.rank(userId)) + '<br clear="all">');
            }
            return this.sendReplyBox(profile.avatar(false, userId) + profile.name(false, target) + profile.group(false, userId) + profile.display('about', about) + profile.lastSeen(false, userId) + profile.display('money', money) + profile.display('elo', elo, profile.rank(userId)) + '<br clear="all">');
        }

        var money = econ.money.get(targetUser);
        var elo = profile.tournamentElo(toId(targetUser.userid));
        var about = profile.about(targetUser.userid);

        if (elo === 1000 && about === 0) {
            return this.sendReplyBox(profile.avatar(true, targetUser, targetUser.avatar) + profile.name(true, targetUser) + profile.group(true, targetUser) + lastSeen(true, targetUser) + profile.display('money', money) + '<br clear="all">');
        }
        if (elo === 1000) {
            return this.sendReplyBox(profile.avatar(true, targetUser, targetUser.avatar) + profile.name(true, targetUser) + profile.group(true, targetUser) + profile.display('about', about) + profile.lastSeen(true, targetUser) + profile.display('money', money) + '<br clear="all">');
        }
        if (about === 0) {
            return this.sendReplyBox(profile.avatar(true, targetUser, targetUser.avatar) + profile.name(true, targetUser) + profile.group(true, targetUser) + profile.lastSeen(true, targetUser) + profile.display('money', money) + profile.display('elo', elo, profile.rank(targetUser.userid)) + '<br clear="all">');
        }
        return this.sendReplyBox(profile.avatar(true, targetUser, targetUser.avatar) + profile.name(true, targetUser) + profile.group(true, targetUser) + profile.display('about', about) + profile.lastSeen(true, targetUser) + profile.display('money', money) + profile.display('elo', elo, profile.rank(targetUser.userid)) + '<br clear="all">');
    },

    setabout: 'about',
    about: function (target, room, user) {
        if (!target) return this.parse('/help about');
        if (target.length > 30) return this.sendReply('About cannot be over 30 characters.');

        var now = Date.now();

        if ((now - user.lastAbout) * 0.001 < 30) {
            this.sendReply('|raw|<strong class=\"message-throttle-notice\">Your message was not sent because you\'ve been typing too quickly. You must wait ' + Math.floor(
                (30 - (now - user.lastAbout) * 0.001)) + ' seconds</strong>');
            return;
        }

        user.lastAbout = now;

        target = Tools.escapeHTML(target);
        target = target.replace(/[^A-Za-z\d ]+/g, '');

        var data = stdin('about', user.userid);
        if (data === target) return this.sendReply('This about is the same as your current one.');

        stdout('about', user.userid, target);

        this.sendReply('Your about is now: "' + target + '"');
    },
};
