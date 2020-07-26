$(document).ready(function(){
  var isAnimatedGoingUp = $('.sch .animated--going-up');
  var isAnimatedGoingdown = $('.sch .animated--going-down');

  var isAnimatedGoingUp5226 = $('.elm .animated--going-up');
  var isAnimatedGoingdown5226 = $('.elm .animated--going-down');

  var isAnimatedGoingUpLxr = $('.lxr .animated--going-up');
  var isAnimatedGoingdownLxr = $('.lxr .animated--going-down');

  var isAnimatedGoingUpBe = $('.be .animated--going-up');
  var isAnimatedGoingdownBe = $('.be .animated--going-down');

  var isAnimatedGoingUpezres = $('.ezres .animated--going-up');
  var isAnimatedGoingdownezres = $('.ezres .animated--going-down');

  var isAnimatedGoingUpCarmana = $('.carmana .animated--going-up');
  var isAnimatedGoingdownCarmana = $('.carmana .animated--going-down');

  var isAnimatedGoingUpAruba = $('.aruba .animated--going-up');
  var isAnimatedGoingdownAruba = $('.aruba .animated--going-down');

  var isAnimatedGoingUpTimes = $('.times .animated--going-up');
  var isAnimatedGoingdownTimes = $('.times .animated--going-down');

  var isAnimatedGoingUpHair = $('.hair .animated--going-up');
  var isAnimatedGoingdownHair = $('.hair .animated--going-down');

  //  start full page
  $('#full-page').fullpage({
    sectionSelector: '.section-scrolling',
    slideSelector: '.portfolio__slide',
    // controlArrows: true,
    // navigation: true,
    keyboardScrolling: true,
    easingcss3:"ease-in-out",
    anchors:["intro","sch","fifty","lxr","be","ezres","carmana","aruba","times","hair"],
    css3: true,
    menu: '.nav',
    controlArrows: true,
    easingcss3:"ease-in-out",
    onLeave:function(index, nextIndex, direction){
      if( index == 1 && direction == 'down' ) {
        isAnimatedGoingUp.eq(0).addClass('animated fadeInUpBig').css('animation-delay', '.3s'); ;
        isAnimatedGoingUp.eq(1).addClass('animated fadeInUpBig').css('animation-delay', '.6s');
        isAnimatedGoingdown.eq(0).addClass('animated fadeInDownBig').css('animation-delay', '.9s'); 
      } else if( (index == 1 || index == 2) && nextIndex == 3 )  {
        isAnimatedGoingUp5226.eq(0).addClass('animated fadeInUpBig').css('animation-delay', '.3s'); ;
        isAnimatedGoingUp5226.eq(1).addClass('animated fadeInUpBig').css('animation-delay', '.6s');
        isAnimatedGoingdown5226.eq(0).addClass('animated fadeInDownBig').css('animation-delay', '.9s'); 
      } else if( (index == 2 || index == 3) && nextIndex == 4 )  {
        isAnimatedGoingUpLxr.eq(0).addClass('animated fadeInUpBig').css('animation-delay', '.3s'); ;
        isAnimatedGoingUpLxr.eq(1).addClass('animated fadeInUpBig').css('animation-delay', '.6s');
        isAnimatedGoingdownLxr.eq(0).addClass('animated fadeInDownBig').css('animation-delay', '.9s'); 
      } else if( (index == 3 || index == 4) && nextIndex == 5 )  {
        isAnimatedGoingUpBe.eq(0).addClass('animated fadeInUpBig').css('animation-delay', '.3s'); ;
        isAnimatedGoingUpBe.eq(1).addClass('animated fadeInUpBig').css('animation-delay', '.6s');
        isAnimatedGoingdownBe.eq(0).addClass('animated fadeInDownBig').css('animation-delay', '.9s'); 
      } else if( (index == 4 || index == 5) && nextIndex == 6 )  {
        isAnimatedGoingUpezres.eq(0).addClass('animated fadeInUpBig').css('animation-delay', '.3s'); ;
        isAnimatedGoingUpezres.eq(1).addClass('animated fadeInUpBig').css('animation-delay', '.6s');
        isAnimatedGoingdownezres.eq(0).addClass('animated fadeInDownBig').css('animation-delay', '.9s'); 
      } else if( (index == 5 || index == 6) && nextIndex == 7 )  {
        isAnimatedGoingUpCarmana.eq(0).addClass('animated fadeInUpBig').css('animation-delay', '.3s'); ;
        isAnimatedGoingUpCarmana.eq(1).addClass('animated fadeInUpBig').css('animation-delay', '.6s');
        isAnimatedGoingdownCarmana.eq(0).addClass('animated fadeInDownBig').css('animation-delay', '.9s'); 
      } else if( (index == 6 || index == 7) && nextIndex == 8 )  {
        isAnimatedGoingUpAruba.eq(0).addClass('animated fadeInUpBig').css('animation-delay', '.3s'); ;
        isAnimatedGoingUpAruba.eq(1).addClass('animated fadeInUpBig').css('animation-delay', '.6s');
        isAnimatedGoingdownAruba.eq(0).addClass('animated fadeInDownBig').css('animation-delay', '.9s'); 
      } else if( (index == 7 || index == 8) && nextIndex == 9 )  {
        isAnimatedGoingUpTimes.eq(0).addClass('animated fadeInUpBig').css('animation-delay', '.3s'); ;
        isAnimatedGoingUpTimes.eq(1).addClass('animated fadeInUpBig').css('animation-delay', '.6s');
        isAnimatedGoingdownTimes.eq(0).addClass('animated fadeInDownBig').css('animation-delay', '.9s'); 
      } else if( (index == 8 || index == 9) )  {
        isAnimatedGoingUpHair.eq(0).addClass('animated fadeInUpBig').css('animation-delay', '.3s'); ;
        isAnimatedGoingUpHair.eq(1).addClass('animated fadeInUpBig').css('animation-delay', '.6s');
        isAnimatedGoingdownHair.eq(0).addClass('animated fadeInDownBig').css('animation-delay', '.9s'); 
      }
    }
  });

  // mobile nav
  $('.menu-btn').on('click', function(){
    $('.navigation').toggleClass('navigation--open');
    $('.menu-btn').toggleClass('open');
  })
   
})

// Run navigation entry animation on desktop only
const animateCSS = (element, animation) =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd() {
      node.classList.remove(`animated`, animationName);
      node.removeEventListener('animationend', handleAnimationEnd);

      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd);
  });

// check window size and run if is desktop
var isDesktop = window.innerWidth;
if (isDesktop > 1200) {
  animateCSS('.navigation', 'fadeInLeft')
}





// start rotating intro line
//set animation timing
var animationDelay = 2500,
    //loading bar effect
    barAnimationDelay = 3800,
    barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
    //letters effect
    lettersDelay = 50,
    //type effect
    typeLettersDelay = 150,
    selectionDuration = 500,
    typeAnimationDelay = selectionDuration + 800,
    //clip effect 
    revealDuration = 600,
    revealAnimationDelay = 1500;

initHeadline();


function initHeadline() {
  //insert <i> element for each letter of a changing word
  singleLetters($('.intro__headline.letters').find('b'));
  //initialise headline animation
  animateHeadline($('.intro__headline'));
}

function singleLetters($words) {
  $words.each(function(){
    var word = $(this),
    letters = word.text().split(''),
    selected = word.hasClass('is-visible');
    for (i in letters) {
      if(word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
      letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>': '<i>' + letters[i] + '</i>';
    }
    var newLetters = letters.join('');        
    word.html(newLetters).css('opacity', 1);
  });
}

function animateHeadline($headlines) {
  var duration = animationDelay;
  $headlines.each(function(){
    var headline = $(this);

    if(headline.hasClass('loading-bar')) {
      duration = barAnimationDelay;
      setTimeout(function(){ headline.find('.cd-words-wrapper').addClass('is-loading') }, barWaiting);
    } else if (headline.hasClass('clip')){
      var spanWrapper = headline.find('.cd-words-wrapper'),
      newWidth = spanWrapper.width() + 10
      spanWrapper.css('width', newWidth);
    } else if (!headline.hasClass('type') ) {
      //assign to .cd-words-wrapper the width of its longest word
      var words = headline.find('.cd-words-wrapper b'),
      width = 0;
      words.each(function(){
        var wordWidth = $(this).width();
        if (wordWidth > width) width = wordWidth;
      });
      headline.find('.cd-words-wrapper').css('width', width);
    };

    //trigger animation
    setTimeout(function(){ hideWord( headline.find('.is-visible').eq(0) ) }, duration);
  });
}

function hideWord($word) {
  var nextWord = takeNext($word);

  if($word.parents('.intro__headline').hasClass('type')) {
    var parentSpan = $word.parent('.cd-words-wrapper');
    parentSpan.addClass('selected').removeClass('waiting'); 
    setTimeout(function(){ 
      parentSpan.removeClass('selected'); 
      $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
    }, selectionDuration);
    setTimeout(function(){ showWord(nextWord, typeLettersDelay) }, typeAnimationDelay);

  } else if($word.parents('.intro__headline').hasClass('letters')) {
    var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
    hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
    showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

  }  else if($word.parents('.intro__headline').hasClass('clip')) {
    $word.parents('.cd-words-wrapper').animate({ width : '2px' }, revealDuration, function(){
      switchWord($word, nextWord);
      showWord(nextWord);
    });

  } else if ($word.parents('.intro__headline').hasClass('loading-bar')){
    $word.parents('.cd-words-wrapper').removeClass('is-loading');
    switchWord($word, nextWord);
    setTimeout(function(){ hideWord(nextWord) }, barAnimationDelay);
    setTimeout(function(){ $word.parents('.cd-words-wrapper').addClass('is-loading') }, barWaiting);

  } else {
    switchWord($word, nextWord);
    setTimeout(function(){ hideWord(nextWord) }, animationDelay);
  }
}

function showWord($word, $duration) {
  if($word.parents('.intro__headline').hasClass('type')) {
    showLetter($word.find('i').eq(0), $word, false, $duration);
    $word.addClass('is-visible').removeClass('is-hidden');

  }  else if($word.parents('.intro__headline').hasClass('clip')) {
    $word.parents('.cd-words-wrapper').animate({ 'width' : $word.width() + 10 }, revealDuration, function(){ 
      setTimeout(function(){ hideWord($word) }, revealAnimationDelay); 
    });
  }
}

function hideLetter($letter, $word, $bool, $duration) {
  $letter.removeClass('in').addClass('out');

  if(!$letter.is(':last-child')) {
    setTimeout(function(){ hideLetter($letter.next(), $word, $bool, $duration); }, $duration);  
  } else if($bool) { 
    setTimeout(function(){ hideWord(takeNext($word)) }, animationDelay);
  }

  if($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
    var nextWord = takeNext($word);
    switchWord($word, nextWord);
  } 
}

function showLetter($letter, $word, $bool, $duration) {
  $letter.addClass('in').removeClass('out');

  if(!$letter.is(':last-child')) { 
    setTimeout(function(){ showLetter($letter.next(), $word, $bool, $duration); }, $duration); 
  } else { 
    if($word.parents('.intro__headline').hasClass('type')) { setTimeout(function(){ $word.parents('.cd-words-wrapper').addClass('waiting'); }, 200);}
    if(!$bool) { setTimeout(function(){ hideWord($word) }, animationDelay) }
  }
}

function takeNext($word) {
  return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
}

function takePrev($word) {
  return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
}

function switchWord($oldWord, $newWord) {
  $oldWord.removeClass('is-visible').addClass('is-hidden');
  $newWord.removeClass('is-hidden').addClass('is-visible');
}





