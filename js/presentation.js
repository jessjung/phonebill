function dispalyAbout(){

  console.log("presentation : displayAbout");
  var that = $("#presentation-content");
  activePresentationMode();
  that.addClass("v-content");
  $('<div></div>').appendTo(that).addClass('videodiv').html('<!-- This version of the embed code is no longer supported. Learn more: https://vimeo.com/s/tnm --> <object width="1024" height="575"><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="http://vimeo.com/moogaloop.swf?clip_id=107829722&amp;force_embed=1&amp;server=vimeo.com&amp;show_title=0&amp;show_byline=0&amp;show_portrait=0&amp;color=00adef&amp;fullscreen=1&amp;autoplay=0&amp;loop=0" /><embed src="http://vimeo.com/moogaloop.swf?clip_id=107829722&amp;force_embed=1&amp;server=vimeo.com&amp;show_title=0&amp;show_byline=0&amp;show_portrait=0&amp;color=00adef&amp;fullscreen=1&amp;autoplay=0&amp;loop=0" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="1024" height="575"></embed></object>');
}

function activePresentationMode(){
  $(".p-wrapper").css("display", "block");
  $("#presentation-bg").addClass("dim");
}


function clearPresentationMode(){
  $(".p-wrapper").css("display", "none");
  $("#presentation-content").html();
}
