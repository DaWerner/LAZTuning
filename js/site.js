function myMap()
{
  myCenter=new google.maps.LatLng(41.878114, -87.629798);
  var mapOptions= {
    center:myCenter,
    zoom:12, scrollwheel: false, draggable: false,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("googleMap"),mapOptions);

  var marker = new google.maps.Marker({
    position: myCenter,
  });
  marker.setMap(map);
}

// Modal Image Gallery
function onClick(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  var captionText = document.getElementById("caption");
  captionText.innerHTML = element.alt;
}

// Change style of navbar on scroll
window.onscroll = function() {myFunction()};
function myFunction() {
    var navbar = document.getElementById("myNavbar");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        navbar.className = "w3-bar" + " w3-card" + " w3-animate-top" + " w3-white";
    } else {
        navbar.className = navbar.className.replace(" w3-card w3-animate-top w3-white", "");
    }
}

// Used to toggle the menu on small screens when clicking on the menu button
function toggleFunction() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

function fadeAway(showid){
    var elem = document.querySelector("#news div.active");
    elem.style.opacity = 1;
    var interval = setInterval(function(){
        elem.style.opacity -= 0.2;
        if(elem.style.opacity < 0){
            elem.classList.add("inactive");
            elem.classList.remove("active");
            clearInterval(interval);
            fadeIn(showid);

        }
    } , 100);
}

function fadeIn(id){
    var elem = document.querySelector("#"+ id);
    elem.style.opacity = 0.0;
    elem.classList.remove("inactive");
    elem.classList.add("active");
    var interval = setInterval(function(){
        var cur = parseFloat(elem.style.opacity) 
        var toSet = cur + 0.2;
        elem.style.opacity = toSet;
        console.log(typeof elem.style.opacity)
        if(elem.style.opacity > 1){
            clearInterval(interval);
        }
    } , 100);

}
var news = ["LAZ_Folientechnik", "H7_Leuchtmittel", "Beschleunigungsmessung", "Angel_Eyes"]
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    var val = slideIndex += n;
    showSlides(val);
    if(val > 4) val = 1;
    fadeAway(news[val-1]);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1} 
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
  }
  slides[slideIndex-1].style.display = "block"; 
}

