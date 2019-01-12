// slider

function ScrollHandler(pageId) {
  var page = document.getElementById(pageId);
  var pageStart = page.offsetTop;
  var pageJump = false;
  var control = 0;
  var viewStart;
  var duration = 1200;
  var scrolled = document.getElementById("scroll");

  function scrollToPage() {
    pageJump = true;
    control = 1;

    // Calculate how far to scroll
    var startLocation = viewStart;
    var endLocation = pageStart;
    var distance = endLocation - startLocation;

    var runAnimation;

    // Set the animation variables to 0/undefined.
    var timeLapsed = 0;
    var percentage, position;

    var easing = function(progress) {
      return progress < 0.5
        ? 4 * progress * progress * progress
        : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1; // acceleration until halfway, then deceleration
    };

    function stopAnimationIfRequired(pos) {
      if (pos == endLocation) {
        cancelAnimationFrame(runAnimation);
        setTimeout(function() {
          pageJump = false;
          control = 0
        }, 500);
      }
    }

    var animate = function() {
      timeLapsed += 16;
      percentage = timeLapsed / duration;
      if (percentage > 1) {
        percentage = 1;
        position = endLocation;
      } else {
        position = startLocation + distance * easing(percentage);
      }
      scrolled.scrollTop = position;
      runAnimation = requestAnimationFrame(animate);
      stopAnimationIfRequired(position);
      //console.log("position=" + scrolled.scrollTop + "(" + percentage + ")");
    };
    // Loop the animation function
    runAnimation = requestAnimationFrame(animate);
  }

  function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

  if (!isMobileDevice()) {
    window.addEventListener("wheel", function(event) {
      viewStart = scrolled.scrollTop;
      if (!pageJump) {
        var pageHeight = page.scrollHeight;
        var pageStopPortion = pageHeight / 2;
        var viewHeight = window.innerHeight;

        var viewEnd = viewStart + viewHeight;
        var pageStartPart = viewEnd - pageStart;
        var pageEndPart = pageStart + pageHeight - viewStart;

        var canJumpDown = pageStartPart >= 0;
        var stopJumpDown = pageStartPart > pageStopPortion;

        var canJumpUp = pageEndPart >= 0;
        var stopJumpUp = pageEndPart > pageStopPortion;

        var scrollingForward = event.deltaY > 0;
        /*console.log(scrollingForward) */
        if (
          (scrollingForward && canJumpDown && !stopJumpDown) ||
          (!scrollingForward && canJumpUp && !stopJumpUp)
        ) {
          event.preventDefault();
          scrollToPage();
        }

      } else {
        event.preventDefault();
      }
    });
  }


  /* MOUSE EVENTS */
  // document.addEventListener('touchstart', handleTouchStart, false);
  // document.addEventListener('touchmove', handleTouchMove, false);

  var xDown = null;
  var yDown = null;

  function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
  }

  function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }

  function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */
        } else {
            /* right swipe */
        }
    } else {
      viewStart = scrolled.scrollTop;
      if (!pageJump) {
        var pageHeight = page.scrollHeight;
        var pageStopPortion = pageHeight / 2;
        var viewHeight = window.innerHeight;

        var viewEnd = viewStart + viewHeight;
        var pageStartPart = viewEnd - pageStart;
        var pageEndPart = pageStart + pageHeight - viewStart;

        var canJumpDown = pageStartPart >= 0;
        var stopJumpDown = pageStartPart > pageStopPortion;

        var canJumpUp = pageEndPart >= 0;
        var stopJumpUp = pageEndPart > pageStopPortion;

        var scrollingForward = yDiff > 0 ? true : false;
        /*console.log(scrollingForward)*/
        if (
          (scrollingForward && canJumpDown && !stopJumpDown) ||
          (!scrollingForward && canJumpUp && !stopJumpUp)
        ) {
          evt.preventDefault();
          scrollToPage();
        }

      } else {
        evt.preventDefault();
      }

    }
    /* reset values */
    xDown = null;
    yDown = null;
  }

}

window.onload = function() {
  new ScrollHandler("home");
  new ScrollHandler("project1");
  new ScrollHandler("project2");
  new ScrollHandler("project3");

};

function myFunction() {
  var x = document.getElementById("myTopnav");
  var y = document.querySelectorAll('.lul');
  var z = document.querySelector('.icon');

  if (x.className === "topnav" || x.className === "topnav topnav-animation") {
    x.classList.add("responsive");
    y.forEach(e => e.classList.add('fix'));
  } else {
    x.className = "topnav topnav-animation";
    setTimeout(() => {
        y.forEach(e => e.classList.remove('fix'));
    }, 750);
  }
}
