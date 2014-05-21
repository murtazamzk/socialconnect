jQuery(function(){
   
});

win="";
//$.noConflict();

   //alert("loaded");
var cursor;
var users;
var fdata;
var flag=false;
var cint;
login=false;
var fcount;
var left = (screen.width/2)-(600/2);
var top = (screen.height/2)-(600/2);
function opent(){
   win = window.open("redirect.php","popup","width=600,height=600, top="+top+", left="+left); 


 cint=window.setInterval(chk, 1000)
}
 
           function chk() {
    
        if (win.closed) {
            getdata();
            window.clearInterval(cint);
        }
    
}

function getdata(){
    if(login == true){
showloading();
jQuery.ajax({
  type: 'POST',
  url: 'data.php',
  data: {action : 'get_data'},
  dataType: 'json',
  cache: false,
  success: function(result) {
    hideloading();
    load_data(result);
  },
  error: function() {
      jQuery('#siwt').show();
      //alert("Something went wrong with Twitter API, Plz try again later");
      jQuery('#loader .preloader').hide();
      jQuery('#loader h1').hide();
      jQuery('#loader p').text("Something went wrong with Twitter API , Please Reload the page after Some time")
      //location.reload();
  }
  });
    }
}

   function showloading() {
       jQuery('#loader').addClass('show');
       jQuery('#siwt').hide();
       jQuery('#linfo').css('display','block');
   }
   function hideloading() {
       jQuery('#loader').hide();
       jQuery('#linfo').hide();
       jQuery('.content').css('opacity','1');
   }


function load_data(result){

    var strtwt,followers="";
    strtwt=" ";
    var i=0,j=1;
    jQuery.each(result,function(i,elem){
        if(i=='cursor'){
            cursor=elem[0];
        }
        
        if(i=='name'){
            jQuery('#name').text('Welcome : ' + elem[0]);
        }
        
        if(i=='fcount'){
            fcount=elem[0];
            jQuery('#fcount').text(elem[0]);
        }
        
        if(i=='status'){
           for(i=0;i<elem[0].length;i=i+2,j++){ 
          strtwt += "<li data-orbit-slide='headline-"+j+"'>";
          strtwt += "<p class=large-8'>"+ geturl(elem[0][i]) +"</p>";
          strtwt +="<p class='large-4'><a href='#'>"+jQuery.timeago(new Date(elem[0][i+1]))+"</a></p></li>";
          
       }
       jQuery("#mytweets").append(strtwt);
       }
       if(i=='users'){
           fdata = elem[0];
           if(flag==false){
    jQuery.ajax({
     url: 'js/suggest.js',
     dataType: 'script',
     success : function(){
         flag=true;
     }
    });
}
           for(i=0;i<elem[0].length;i=i+3){
           followers="<li><img src='"+elem[0][i+2].replace('_normal','')+"' class='th'><a href='http://twitter.com/"+elem[0][i]+"'>@"+elem[0][i]+"</a></li>";
           jQuery("#followers").append(followers);
            //console.log(elem);
           }
       
       }
       
    });
    
    jQuery("#twittercontent").fadeIn();
    loadorbit();
    get_all_followers();
}

function geturl(txt){
    var re = /(https?:\/\/(([-\w\.]+)+(:\d+)?(\/([\w/_\.]*(\?\S+)?)?)?))/g;
    return txt.replace(re, "<a href=\"$1\">$1</a>");
}

function gettime(time){
var arr = time.split(" ");
var year = arr.splice(arr.length-1,1);
arr.splice(arr.length-1,0, year[0]);
return jQuery.timeago(time);
}

function loadorbit(){
    jQuery.ajax({
     url: 'js/foundation/foundation.orbit.js',
     dataType: 'script',
     success: function(){
       //initiate orbit
       jQuery("#mytweets").css('height','100px');
       jQuery(document).foundation('orbit', {
			animation : 'slide',
			bullets : true,
                        timer_speed : 5000, 
                        timer:true,
                        variable_height: true,
			navigation_arrows : false,
			slide_number : false

		});
     },
     async: false
   });
}
function get_all_followers(){
    jQuery.ajax({
  type: 'POST',
  url: 'data.php',
  data: {action : 'get_all_followers',cursor : cursor},
  dataType: 'json',
  cache: false,
  success: function(result) {
     jQuery.each(result,function(i,elem){
         if(i=='users'){
            load_followers(elem[0]);
         }
         if(i=='cursor'){
             
             cursor=elem[0];
         }
     }); 
  },
  error: function() {
      //jQuery('.search label').text('Loading failed , please try again later');
 jQuery('.search .preloader').hide();
  }
  });
}

function load_followers(result){
fdata=jQuery.merge(fdata,result);
         jQuery('#flength').text(fdata.length/3);
         if(fdata.length/3 < fcount)
             get_all_followers();
}


function get_follower_status(screen_name){
 jQuery('#ftweets').parent('.orbit-container').remove();
 var strtwt ="<ul data-orbit id='ftweets' class='tweets' style='height : 91px'>";
    $suggestedUL.hide();
    jQuery('#followers_tweets .preloader').show();
    jQuery('#followers_tweets h3').show().text(screen_name + " tweets");
    jQuery.ajax({
  type: 'POST',
  url: 'data.php',
  data: {action : 'get_followers_tweets',screen_name : screen_name},
  dataType: 'json',
  cache: false,
  success: function(result) {
      jQuery('#followers_tweets .preloader').hide();
      if(result.length==0){
          jQuery('#followers_tweets h3').show().text(screen_name + " has no tweets");
      }
      else{
          for(j=1,i=0;i<result.length;i=i+2,j++){ 
          strtwt += "<li data-orbit-slide='headline-"+j+"'>";
          strtwt += "<p class=large-8'>"+ geturl(result[i]) +"</p>";
          strtwt +="<p class='large-4'><a href='#'>"+jQuery.timeago(new Date(result[i+1]))+"</a></p></li>";
          
       }
       strtwt +="</ul>";
       jQuery("#followers_tweets .preloader").after(strtwt);
       jQuery(document).foundation('orbit', {
			animation : 'slide',
			bullets : true,
                        timer_speed : 5000, 
                        timer:true,
                        variable_height: true,
			navigation_arrows : false,
			slide_number : false

		});
     }
      
    //load_followers(result);
  },
  error: function() {

  }
  });

}