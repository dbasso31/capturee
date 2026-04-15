
	var CB = CB || {}; 
	
	/*
	 * CLASSES
	 * 
	 * CB.sound
	 * 
	 */

    
	 //---------------------------------------
    //---- class - sound
    //---------------------------------------	
	CB.sound = (function() 
    {
        var s = {
			$audio : null,
			timer : null,
			playing : false,
			volume : -1,
			flashParams 	: {
				menu 				: 'false',
				quality 			: 'high',
				scale 				: 'noscale',
				salign 				: 'tl',
				bgcolor 			: '#000000',
				allowscriptaccess 	: 'always',
				wmode				: 'transparent'
			},
			flashAttr 	: {
				id 		: 'audio',
				align 	: 'left'
			}
		},
		cs={},
		$_win = $(window);
		
		function init(options)
		{
			$.extend(s, options);
			cs = CB.core.settings;
			
			_initSound();
		//	changeVolume(1);
		};
		
		function _initSound()
		{
			var soundName =cs.SOUND_NAME["mp3"];
				
			log(cbRegistry["pathSounds"]+soundName);	
			if (Modernizr.audio)
			{
				if (Modernizr.audio.ogg) soundName = cs.SOUND_NAME["ogg"];
				
				s.$audio = $('<audio id="playerAudio" />').attr('src', cbRegistry["pathSounds"]+soundName)
														.attr('loop','loop');
				$('body').prepend(s.$audio);
			}
			else
			{
				
				var flashVars = {s:cbRegistry["pathSounds"]+soundName};
				$('body').prepend("<div id='audio'></div>");
				swfobject.embedSWF(cbRegistry["baseUrl"] + 'swf/player-audio.swf',s.flashAttr.id, "1px", "1px", '10.0.0', cbRegistry["baseUrl"] +'js/libs/swfobject/expressInstall.swf', flashVars, s.flashParams, s.flashAttr);	
			}
		};
		
		function _playSound()
		{
			s.playing=true;
			if (Modernizr.audio) s.$audio[0].play();
		};
		
		function changeVolume(volume)
		{
			if ((s.volume==volume) || (volume==1 && $("li.volume",cs.$footer).hasClass("off")))
				return;
			else if (!s.playing)
			{
				if (volume==0)
					return
				else	
					_playSound();
			}	
	
			s.volume=volume;
			
			if (Modernizr.audio)
				_changeVolumePlayerHtml();
			else
				_changeVolumePlayerFlash();	
		};
		
		function _changeVolumePlayerFlash()
		{
			try
			{
				document.getElementById(s.flashAttr.id).changeVolume(s.volume);
			} 
			catch (e) {
				log("_changeVolumePlayerFlash FLASH error");
			}
		};
		
		function _changeVolumePlayerHtml()
		{
			var vol = s.$audio[0].volume;
			
			_resetTimer();

			if (s.volume==0)
			{
	           	s.timer = setInterval(function() {
			        if (vol > 0)
					{
			            vol -= 0.1;
						if (vol>=0) s.$audio[0].volume = vol.toFixed(2);
			        }
					else
					{
			            s.$audio[0].volume=0;
						_resetTimer();
			        }
	            }, 20);
	        }
			else
			{
				s.timer = setInterval(function() {
			        if (vol < 1)
					{
			            vol += 0.1;
						if (vol<=1) s.$audio[0].volume = vol.toFixed(2);
			        }
					else
					{
			           	s.$audio[0].volume=1;
						_resetTimer();
			        }
	            }, 20);
			}
		};
		
		function _resetTimer()
		{
			if (s.timer!=null)
			{
				clearInterval(s.timer);
				s.timer=null;	
			}
		};
		
		function getVolume()
		{
			if ($("li.volume",cs.$footer).hasClass("off"))
				return 0;
			else
				return 1;	
		};
				
		return {
            init : init,
			changeVolume : changeVolume,
			getVolume : getVolume
        };
	}());	
