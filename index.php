<?php
session_start();
require_once('twitteroauth/twitteroauth.php');
require_once('config.php');
?>

<!DOCTYPE html>
<!--[if IE 8]> 				 <html class="no-js lt-ie9" lang="en" > <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js" lang="en">
    <!--<![endif]-->

    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>SocialConnect - Connect Social network in a different way</title>
        <meta name="keywords" content="twitter api connect , facebook api application , social connect , linkedin api application" />
        <meta name="description" content="Socail connect is a web application which uses spcial network api's for custom usage" />

        <link rel="stylesheet" href="css/foundation.css">
        <link rel="stylesheet" href="css/style.css">

        <link href='http://fonts.googleapis.com/css?family=Ubuntu'
              rel='stylesheet' type='text/css'>

        <style>
            .contentSlider {
                width: 100%;
            }

            .contentSlider,.contentSlider .rsOverflow,.contentSlider .rsSlide,.contentSlider .rsVideoFrameHolder,.contentSlider .rsThumbs
            {
                background: #eee;
                color: #000;
            }

            .contentSlider .rsSlide,.contentSlider .rsOverflow {
                background: #eee;
            }

            .contentSlider h3 {
                font-size: 24px;
                line-height: 31px;
                margin: 12px 0 8px;
                font-weight: bold;
            }

            .contentSlider img {
                max-width: 100%;
                height: auto;
                display: block;
            }

            .content-slider-bg {
                width: 86%;
                padding: 24px 7%;
                background: #eee;
            }
        </style>

        <script src="js/vendor/custom.modernizr.js"></script>
        <script src="js/jquery-1.8.3.min.js"></script>
        <script src="js/foundation/foundation.section.js"></script>
        <script src="js/jquery.timeago.js"></script>
        <script src="js/app.js"></script>


    </head>
    <body>


        <div class="row">
            <div class="logo large-12 columns">
                <h1>
                    Social Connect
                </h1>


            </div>
        </div>


        <div class="row">
            <div class="large-12 columns">


                <div class="section-container auto" data-section>

                    <!-- 			<ul class="button-group even-2"> -->
                    <!--           <li><p class="title" data-section-title><a href="#panel1" class="button">Twitter</a></p></li> -->
                    <!--            <li><p class="title" data-section-title><a href="#panel2" class="button">Facebook</a></p></li> -->
                    <!--         </ul> -->

                    <section class="active">
                        <p class="title twtbtn" data-section-title><a href="#panel1">Twitter</a></p>
<!-- 					<p class="title" data-section-title> -->
<!-- 						<a href="#panel1"><img src="img/twitter.png"/ width="150px"></a> -->
                        <!-- 					</p> -->
                        <div class="content" data-section-content>
                            <div id="loader">
                                <h1>Loading data please wait</h1>
                                <p></p>
                                <div class="preloader"></div>
                            </div>
                            
                            <?php
                            if (empty($_SESSION['access_token']) || empty($_SESSION['access_token']['oauth_token']) || empty($_SESSION['access_token']['oauth_token_secret'])) {
                                echo "<div id='siwt'>";
                                echo "<h1>Sign in to experience the twitter social life</h1>";
                                echo "<ul style='list-style: none;'><li>See your tweets in a slider</li><li>Search followers and see their tweets</li><li>Download tweets (Work in progress)</li></ul>";
                                echo "<img onClick='opent();' src='img/siwt.png'/>";
                                echo "</div>";
                            } else {
                                echo "<script>login=true;getdata();</script>";
                            }
                            ?>
                            

                            <div id="twittercontent">



                                <div class="small-2 large-8 columns"><div id="name">Welcome : </div></div>
                                <div class="small-4 large-4 columns"><a class="small button right" href="logout.php">Logout</a></div>


                                <h3>Your tweets</h3>
                                <ul data-orbit id="mytweets" class="tweets">

                                </ul>
                                <br/>

                                <div class="right">Followers : <span id="flength">10 </span>/<span id="fcount"></span></div>

                                <div class="search">
                                    <label for="right-label" class="">Search a Follower</label>

                                    <div class="suggest-holder">
                                        <input type="text" class="large-6" id="right-label" placeholder="Follower Name">
                                        <ul id="flist"></ul>
                                    </div>
                                </div>

                                <div id="followers_tweets">
                                    <h3></h3>
                                    <div class="preloader"></div>



                                    <br/>                                                
                                </div>


                                <br/><br/>
                                <h3>Your Followers</h3>
                                <ul id="followers" class="small-block-grid-2 small-block-grid-6">

                                </ul>
                                <br/>



                            </div>
                    </section>

                    <section>
                        <p class="title fbbtn" data-section-title><a href="#panel2">Facebook</a></p>
<!-- 					<p class="title" data-section-title> -->
                        <!-- 						<a href="#panel2">Facebook</a> -->
                        <!-- 					</p> -->
                        <div class="content ucontent" data-section-content>
                            <p>Facebook Connect is under construction.</p>
                        </div>
                    </section>

                    <section>
                        <p class="title libtn" data-section-title><a href="#panel3">Linkedin</a></p>
<!-- 					<p class="title" data-section-title> -->
                        <!-- 						<a href="#panel2">Facebook</a> -->
                        <!-- 					</p> -->
                        <div class="content ucontent" data-section-content>
                            <p>Linkedin Connect is Under Construction.</p>
                        </div>
                    </section>

                </div>
            </div>
        </div>

    </div>
    <script>
        document.write('<script src='
            + ('__proto__' in {} ? 'js/vendor/zepto' : 'js/vendor/jquery')
            + '.js><\/script>')
    </script>

    <script src="js/foundation.min.js"></script>
    <!--

<script src="js/foundation/foundation.js"></script>

<script src="js/foundation/foundation.alerts.js"></script>

<script src="js/foundation/foundation.clearing.js"></script>

<script src="js/foundation/foundation.cookie.js"></script>

<script src="js/foundation/foundation.dropdown.js"></script>

<script src="js/foundation/foundation.forms.js"></script>

<script src="js/foundation/foundation.joyride.js"></script>

<script src="js/foundation/foundation.magellan.js"></script>

<script src="js/foundation/foundation.orbit.js"></script>

<script src="js/foundation/foundation.reveal.js"></script>

<script src="js/foundation/foundation.section.js"></script>

<script src="js/foundation/foundation.tooltips.js"></script>

<script src="js/foundation/foundation.topbar.js"></script>

<script src="js/foundation/foundation.interchange.js"></script>

<script src="js/foundation/foundation.placeholder.js"></script>

<script src="js/foundation/foundation.abide.js"></script>

    -->

    <footer><p>&copy; 2013 | Developed with &#9829; by Murtaza Kanpurwala</p></footer>

    <script>
            
        jQuery(document).foundation('section',{deep_linking: true});
            
    </script>

</body>
</html>
