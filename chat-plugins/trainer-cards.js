/*****************
 * Trainer Cards *
 *****************/

exports.commands = {
	
	mercilessleague: function (target, room, user) {
		if (room.id !== 'lobby') if (!this.canBroadcast()) return;
		this.sendReplyBox('<center><img src="http://i.imgur.com/4AEkWrg.png" width="480"><br />' +
			'<img src="http://i.imgur.com/FILf3Um.png" width="280">' +
			'<img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/charizard-megax.gif"><br />' +
			'<font color="blue">Champion: </font>StunfiskThe Great<br />' +
			'<b>We are Merciless and We Mean Business! Come challenge us or join today!</b><br />' +
			'Click <a href="http://mercilessleague.weebly.com/">here</a> to see our website<br />' +
			'Click <a href="https://docs.google.com/document/d/1OTP9JDz2Q6z6oFnvy2-jRH5o9XdFwZaJBU-ndRWpgIM/edit"> here </a>for rules and registering'
		);
	},
	
	alphaninja: function (target, room, user) {
		if (room.id !== 'lobby') if (!this.canBroadcast()) return;
		this.sendReplyBox('<table width="100%" bgcolor="#C6AFCA"><tr><td><center><font size="4" class="alphaninja-txt" color="#703E77">Alpha Ninja</font></center><img src="http://th08.deviantart.net/fs71/PRE/i/2013/298/8/2/aegislash_by_theangryaron-d6rscu6.png" width="80" height="75" align="right"><img src="http://cdn.bulbagarden.net/upload/thumb/c/c6/094Gengar.png/250px-094Gengar.png" width="80" height="80" align="left"><br><center><font color="#7C4781" class="alphaninja-txt">17 years old</font> <font color="#703E77">•</font> <font color="#7C4781" class="alphaninja-txt">From Belgium</font></center><center><font color="#7C4781" class="alphaninja-txt">Hobbies: Gaming, Watching Animes, Television.</font></center><br><center><img src="http://flipapicture.com/uploaded_images/101545_000gengar.png" width="30" height="23"><button class="purple-btn" name="send" value="/transferbucks alphaninja, 1">Donate 1 buck!</button> <button class="purple-btn" name="send" value="/join slowbrofanclub">Join the FanClub!</button><img src="http://veekun.com/dex/media/pokemon/icons/94.png" width="30" height="23"></center></td></tr></table>');
	}
};
