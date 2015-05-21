/* Seen command
 * by jd and panpawn
 */

var fs = require('fs');
var moment = require('moment');

var seenData = {};
function loadData() {
	try {
		seenData = JSON.parse(fs.readFileSync('config/seenData.json', 'utf8'));
	} catch (e) {
		seenData = {};
	}
}
loadData();

function saveData() {
	fs.writeFileSync('config/seenData.json', JSON.stringify(seenData));
}

function updateSeen(userid) {
	if (!userid) return false;
	seenData[toId(userid)] = Date.now();
	saveData();
}
global.updateSeen = updateSeen;
var userNameColor = Core.hashColor(toId(target)); 
exports.commands = {
	seen: function (target, room, user) {
		try {
			switch (target) {
				case 'obj':
					if (!this.canBroadcast()) return;
					this.sendReplyBox("There have been " + Object.size(seenData) + " user names recorded in this database.");
					break;
				default:
					if (!this.canBroadcast()) return;
					var userid = toId(target);
					if (userid.length < 1) return this.sendReply("/seen - Please specify a name.");
					if (Users(target) && Users(target).connected) return this.sendReplyBox('<b><font color="' + userNameColor + '">' + target + '</font></b> is currently <font color="green">online</green>.');
					if (!seenData[userid]) return this.sendReplyBox('<b><font color="' + userNameColor + '">' + target + "</font></b> has <font color=\"red\">never</font> been seen online.");
					var date = new Date(seenData[userid]);
					var userLastSeen = moment(seenData[userid]).format("MMMM Do YYYY, h:mm:ss a");
					var userLastSeenLabel = userLastSeen.substr(-2).toUpperCase(); //AM or PM
					this.sendReplyBox('The user <b><font color="' + userNameColor + '">' + target + '</font></b> was last seen online ' + userLastSeen.substring(0, userLastSeen.length - 2) + userLastSeenLabel + ' EST.');
			}
		} catch (e) {
			return this.sendReply("Something failed: \n" + e.stack);
		}
	}
};
