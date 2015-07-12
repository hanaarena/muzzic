var playAudio = document.getElementById('player'),
    cd = $('#cd'),
    ins = $('#in'),
    album = $('#album'),
    cover = $('#in'),
    cover_out = $('.out'),
    play = $('#play'),
    music_name = $('#music_name'),
    artist = $('#artist'),
    music_lrc = $('#music_lrc');

$(window).resize(function () {
    //cd_size();
});

$("#player").bind("ended", function () {	
	next_music();
});

ins.one('click', function() {
    if(cover.css('opacity') === '0') {
        cover.css('opacity', '1');
        $('.action').css('opacity', '1');
        album.css({
            'opacity': '1',
            'background-color': 'white', 
            'border': '1px solid #9ad2fe', 
            'background-repeat': 'no-repeat',
            'background-size': 'cover',
            'background-position': '50% 50%'
        });
    }

    next_music();
});

album.one('click', function() {
    if(cover.css('opacity') === '0') {
        cover.css('opacity', '1');
        $('.action').css('opacity', '1');
        album.css({
            'opacity': '1',
            'background-color': 'white',
            'border': '1px solid #9ad2fe',
            'background-repeat': 'no-repeat',
            'background-size': 'cover',
            'background-position': '50% 50%'
        });
    }

    next_music();
});

function music_play() {
    if(playAudio.paused) {
        playAudio.play();
        play.attr('src', '/build/images/pause.png');
        album.addClass('roll');
        cover.addClass('roll');
    } else {
        playAudio.pause();
        play.attr('src', '/build/images/play.png');
        album.removeClass('roll');
        cover.removeClass('roll');
    }
}

function next_music() {
    playAudio.pause();
    album.removeClass('roll');
    cover.removeClass('roll');
    
    load_music();
    play.attr('src', '/build/images/pause.png');
}

function load_music() {
    //$.get("/blogsys/include/modules/playerModule.php?_=" + (new Date()).getTime(), function (data) {
    //    mp3_info = JSON.parse(data);
    //    $('#player').attr('src', mp3_info.mp3);
    //    album.css({'background-image':'url( "' + mp3_info.cover + '")', 'opacity':0}).animate({opacity: 1}, 1000);
    //    music_name.html(mp3_info.music_name);
    //    artist.html(mp3_info.artists);
    //    playAudio.play();
    //    album.addClass('roll');
    //    cover.addClass('roll');
    //});

	$.ajax({
		type: 'GET',
		url: '/song/185982/'
	}).done(function (data) {
		var result = data;
		album.css({'background-image':'url( "' + result['songs'][0]['album']['picUrl'] + '")', 'opacity':0}).animate({opacity: 1}, 1000);
	});
}

function volume(vol) {
    playAudio.volume = vol / 10;
}

function cd_size() {
    cd_height = cd.height();
    cd.css("width", cd_height);
}

$(document).ready(function() {
    //cd_size();
	$(document).keypress(function(e){
        if ((e.which && e.which == 32) || (e.keyCode && e.keyCode == 32)) {  
            music_play();   
            return false;  
        } else {  
            return true;  
        }  
    });
});
