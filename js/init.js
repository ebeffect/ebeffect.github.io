(function($){
  var title=$('html>head>title');
  var title_txt=title.html();
  var content=$('#content');
  $(document).on('hash.init',function () {
    var hash=window.location.hash.substr(1);
    if (hash) {
      $.getJSON('./json/'+hash+'.json',function (re) {
        title.html(re[0].title+'|'+title_txt);
        var items=re[0].items;
        var html='<div class="main">';
        items.forEach(function (item,index) {
          var tit=item.title;
          var desc=item.description;
          var author=item.author;
          var author_url=item.author_url;
          var content=item.content;
          html+='<div class="item" id="item_'+index+'">';
          html+='<h2 class="title" data-id="item_'+index+'">'+tit+'</h2>';
          if (desc) {
            html+='<div class="desc">'+desc;
            if (author) {
              html+='<span class="author">';
              if (author_url) html+='<a href="'+author_url+'" target="_blank">';
              html+=author;
              if (author_url) html+='</a>';
              html+='</span>';
            }
            html+='</div>';
          }
          if (content) html+='<div class="cont">'+content+'</div>';
          html+='</div>';
        });
        html+='</div>';
        content.html(html);
        content.trigger('main.sidebar');
      });
    }
    content.removeClass('hidden');
  });
  $(window).on('load',function () {
    $(document).trigger('hash.init');
  });
  $(document).on('click','.json',function () {
    window.location.href=$(this).attr('href');
    $(document).trigger('hash.init');
  });
  content.on('main.sidebar',function () {
    var main=$(this).children('.main');
    var tit=main.find('h2.title');
    var html='<div class="sidebar"><ul>';
    tit.each(function () {
      html+='<li><span class="auto-scroll" data-id="'+$(this).attr('data-id')+'">'+$(this).html()+'</span></li>';
    });
    html+='<li><a href="/">返回列表</a></li>';
    html+='</ul></div>';
    $(this).prepend($(html));
    if(!$(this).hasClass('has-sidebar')) $(this).addClass('has-sidebar');
  });
  $(document).on('click','.auto-scroll',function () {
    var id=$(this).attr('data-id');
    var offset=$('#'+id).offset();
    $('html,body').scrollTop(offset.top);
  });
})(jQuery);
