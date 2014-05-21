<?php
session_start();
require_once('twitteroauth/twitteroauth.php');
require_once('config.php');

/* Get user access tokens out of the session. */
$access_token = $_SESSION['access_token'];

/* Create a TwitterOauth object with consumer/user tokens. */
$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $access_token['oauth_token'], $access_token['oauth_token_secret']);

/* If method is set change API call made. Test is called by default. */
$content = $connection->get('account/verify_credentials');
$followersdata =$connection->get('followers/ids', array('screen_name' => $content->screen_name , 'count'=>10));
$statusdata=$connection->get('statuses/user_timeline',array('screen_name' => $content->screen_name , 'count'=>10));

$cursor=$followersdata->next_cursor;



if(isset($_POST['action']) && !empty($_POST['action'])){
    if($_POST['action']=='get_all_followers')
        get_all_followers($connection,$content,$_POST['cursor']);
    else if($_POST['action']=='get_data')
        get_data($connection,$content,$followersdata,$statusdata,$cursor);
    else if($_POST['action']=='get_followers_tweets'){
        get_followers_tweets($connection,$_POST['screen_name']);
    }
}

function get_followers_tweets($connection,$screen_name){
    $status=array();
    $statusdata=$connection->get('statuses/user_timeline',array('screen_name' => $screen_name , 'count'=>10));
    foreach($statusdata as $tweet){
          $status[]=$tweet->text;
          $status[]=$tweet->created_at;
    }
    echo json_encode($status);
}

function get_all_followers($connection,$content,$cursor){
    $users = array();
    $arr=array();
    $followersdata =$connection->get('followers/ids', array('screen_name' => $content->screen_name , 'cursor' => $cursor , 'count' => 100));
    $persons=$followersdata->ids;
      foreach($persons as $tweeters){
          $fuser=$connection->get('users/show',array('user_id' => $tweeters));
          
          //echo '<tr>';
          if(is_null($fuser->screen_name)){
             goto sk;
          }
             
          $users[]=$fuser->screen_name;
          $users[]=$fuser->name;
          $users[]=$fuser->profile_image_url;
          sk:
      }
      $arr['cursor'][]=$followersdata->next_cursor;
      $arr['users'][]=$users;
      
      echo json_encode($arr);
}
function get_data($connection,$content,$followersdata,$statusdata,$cursor){

$status=array();
$users = array();

foreach($statusdata as $tweet){
          $status[]=$tweet->text;
          $status[]=$tweet->created_at;
      }
      $persons=$followersdata->ids;
      foreach($persons as $tweeters){
          $fuser=$connection->get('users/show',array('user_id' => $tweeters));
          
          //echo '<tr>';
          $users[]=$fuser->screen_name;
          $users[]=$fuser->name;
          $users[]=$fuser->profile_image_url;
          
      }

$arr['cursor'][]=$cursor;
$arr['name'][]=$content->name;  
$arr['fcount'][]=$content->followers_count;  
$arr['status'][]=$status;
$arr['users'][]=$users;
  
      echo json_encode($arr);
}
?>
