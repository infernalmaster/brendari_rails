import Swipejs from "swipejs";
import Muuri from "muuri";
import Barba from "barba.js";
import lazyLoad from "../lazyload";
import loadScriptIfWasNot from "../loadScript";
import gmapStyles from "../gmapsStyles";
import { HideShowTransition, createTransition } from "../barbaTransitions";
import "intersection-observer";
import ajaxGet from "../ajaxGet";
import play from "../tetris";

let supportsPassiveListener = false;
try {
  var opts = Object.defineProperty({}, "passive", {
    get: function() {
      supportsPassiveListener = true;
    }
  });
  window.addEventListener("testPassive", null, opts);
  window.removeEventListener("testPassive", null, opts);
} catch (e) {}

function initAll(ctx) {
  let count = 0;
  let gc = ctx.querySelector("#game");
  if (gc) {
    gc.addEventListener("mouseover", e => {
      count++;
      if (count === 5) {
        play();
      }
    });
  }

  //
  document.addEventListener("mouseover", ({ target }) => {
    if (!target.classList.contains("js-fnl")) return;

    const index = [].indexOf.call(target.parentNode.children, target);

    const prev = document.querySelector(".js-menu-content.content-active");
    if (prev) prev.classList.remove("content-active");

    const next = document.querySelectorAll(".js-menu-content")[index];

    next.classList.add("content-active");

    if (next.tagName === "VIDEO") {
      next.currentTime = 0;
      next.play();
    }
  });

  // grid
  const msnryContainer = ctx.querySelector(".js-msnry");
  if (msnryContainer) {
    // && document.body.clientWidth > 1023
    msnryContainer.classList.add("js-activated");

    const grid = new Muuri(msnryContainer, {
      items: ".msnry-item",
      // disable animations because safari doesn't support web-animations
      layoutDuration: 0,
      visibleStyles: null,
      layout: {
        fillGaps: true,
        horizontal: false,
        alignRight: false,
        alignBottom: false,
        rounding: true
      }
    });

    let loading = false;
    const observer = new window.IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0 && !loading) {
            loading = true;

            const url = `${document.location.pathname}?skip=${
              msnryContainer.childElementCount
            }`;
            ajaxGet({
              url,
              onSuccess: xhr => {
                if (xhr.responseText.length > 0) {
                  const el = document.createElement("div");
                  el.innerHTML = xhr.responseText;
                  lazyLoad(el.querySelectorAll(".lazyload"));

                  grid.add(el.children);
                } else {
                  observer.disconnect();
                }
                loading = false;
              },
              onError: err => {
                console.log(err);
                loading = false;
              }
            });
          }
        });
      },
      {
        root: null,
        rootMargin: "500px",
        threshold: [0]
      }
    );
    observer.observe(ctx.querySelector(".main-footer"));
  }

  // https://maps.googleapis.com/maps/api/staticmap?key=YOUR_API_KEY&center=48.922339205993204,24.709867111624362&zoom=17&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0x333333&style=element:labels%7Cvisibility:off&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x757575&style=element:labels.text.stroke%7Ccolor:0x212121&style=feature:administrative%7Celement:geometry%7Ccolor:0x757575&style=feature:administrative.country%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:administrative.neighborhood%7Cvisibility:off&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.park%7Celement:geometry%7Ccolor:0x181818&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:poi.park%7Celement:labels.text.stroke%7Ccolor:0x1b1b1b&style=feature:road%7Celement:geometry.fill%7Ccolor:0x1d1d1d&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x8a8a8a&style=feature:road.arterial%7Celement:geometry%7Ccolor:0x373737&style=feature:road.arterial%7Celement:geometry.fill%7Ccolor:0x1d1d1d&style=feature:road.highway%7Celement:geometry%7Ccolor:0x3c3c3c&style=feature:road.highway.controlled_access%7Celement:geometry%7Ccolor:0x4e4e4e&style=feature:road.local%7Celement:geometry.fill%7Ccolor:0x282828&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:water%7Celement:geometry%7Ccolor:0x000000&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x3d3d3d&size=480x360

  // GMAP
  const gmapsEls = ctx.querySelectorAll(".js-gmap");
  if (gmapsEls.length > 0) {
    gmapsEls.forEach(el => {
      el.addEventListener("click", function handleHover() {
        el.removeEventListener("click", handleHover);
        loadScriptIfWasNot(
          `http://maps.google.com/maps/api/js?key=${
            document.body.dataset.gmapApiKey
          }`,
          () => {
            const isHomepage = el.classList.contains("js-map-homepage");
            const mapOptions = {
              zoom: 17,
              mapTypeId: window.google.maps.MapTypeId.ROADMAP,
              center: new window.google.maps.LatLng(0, 0),
              disableDefaultUI: isHomepage,
              draggable: !isHomepage,
              mapTypeControl: false,
              styles: gmapStyles
            };
            const map = new window.google.maps.Map(el, mapOptions);
            const marker = new window.google.maps.Marker({
              position: new window.google.maps.LatLng(48.923564, 24.711256),
              icon: {
                path:
                  "M21.216.014C10.26.397 1.156 8.924.106 19.804-.11 21.982.013 24.09.398 26.11c0 0 .033.235.146.687.34 1.51.848 2.977 1.48 4.352 2.206 5.21 7.306 13.926 18.75 23.41.7.587 1.73.587 2.44 0 11.444-9.472 16.544-18.19 18.76-23.422.644-1.376 1.142-2.83 1.48-4.353.103-.44.148-.688.148-.688.26-1.353.396-2.74.396-4.16C44 9.553 33.722-.427 21.216.013zM22 34c-6.076 0-11-4.924-11-11s4.924-11 11-11 11 4.924 11 11-4.924 11-11 11z",
                fillColor: "#FF0D35",
                fillOpacity: 1,
                anchor: new window.google.maps.Point(22, 55),
                strokeWeight: 0
              },
              map
            });
            const mapCenter = new window.google.maps.LatLng(
              marker.getPosition().lat() + (isHomepage ? -0.0003 : 0),
              marker.getPosition().lng()
            );
            map.panTo(mapCenter);
          }
        );
      });
    });
  }

  // MENU
  const menu = ctx.querySelector(".js-menu");
  if (menu) {
    let isOpen = false;
    ctx.querySelector(".js-open-close-menu").addEventListener("click", e => {
      e.preventDefault();
      if (isOpen) {
        document.body.classList.remove("no-scroll");
        menu.classList.remove("is-active");
      } else {
        document.body.classList.add("no-scroll");
        menu.classList.add("is-active");
      }
      isOpen = !isOpen;
    });

    let container = ctx.querySelector(".barba-container") || ctx;
    let prevPosition = container.scrollTop;
    let isHidden = false;
    let isBig = true
    container.addEventListener(
      "scroll",
      e => {
        let currentPosition = container.scrollTop;

        if (isBig && currentPosition > 400) {
          menu.classList.add("is-small");
          isBig = false
        } else if (!isBig && currentPosition < 200) {
          menu.classList.remove("is-small");
          isBig = true
        }

        if (isHidden && currentPosition < prevPosition) {
          menu.classList.remove("is-hidden");
          isHidden = false;
        } else if (
          !isHidden &&
          currentPosition > 200 &&
          currentPosition > prevPosition
        ) {
          menu.classList.add("is-hidden");
          isHidden = true;
        }

        prevPosition = currentPosition;
      },
      supportsPassiveListener ? { passive: true } : false
    );
  }

  // fix position for contacts page
  const contactsText = ctx.querySelector(".js-contacts-text");
  if (contactsText) {
    const homeLink = ctx.querySelector(".main-nav-link.link-home");

    const fixPosition = function() {
      if (window.innerWidth > 1023) {
        const left = homeLink.getBoundingClientRect().x;
        contactsText.setAttribute("style", `padding-left: ${left}px`);
      } else {
        contactsText.removeAttribute("style");
      }
    };
    fixPosition();

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(fixPosition, 100);
    });
  }

  // video players on logos page
  (() => {
    let video;
    ctx.addEventListener("mouseover", e => {
      if (e.target && e.target.classList.contains("js-play")) {
        video = document.createElement("video");
        video.src = e.target.dataset.video;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;

        video.classList.add("msnry-logo-video");
        e.target.parentNode.append(video);
      }
    });
    ctx.addEventListener("mouseout", e => {
      if (e.target && e.target.classList.contains("js-play")) {
        video.remove();
      }
    });
  })();

  // Home mobile slider
  if (ctx.querySelector(".js-swipe")) {
    ctx.querySelectorAll(".js-swipe").forEach(slider => {
      let homeSlider;

      let dw = slider.querySelector(".dots");
      let dots = [...slider.querySelectorAll(".swipe-slide")].map(
        (_, index) => {
          let dot = document.createElement("div");
          dot.classList.add("dot");
          dw.append(dot);

          dot.addEventListener("click", _ => {
            homeSlider.slide(index, 300);
          });

          return dot;
        }
      );
      dots[0].classList.add("is-active");

      homeSlider = new Swipejs(slider, {
        draggable: true,
        continuous: false,
        callback(index, _) {
          dots.forEach(d => d.classList.remove("is-active"));
          dots[index].classList.add("is-active");
        }
      });
    });
  }

  lazyLoad(ctx.querySelectorAll(".lazyload"));
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => initAll(document));
  Barba.Pjax.start();
  // Barba.Prefetch.init();

  let currentUrl = document.location.pathname;
  let linkClicked = true;
  // let lastElementClicked = null
  Barba.Dispatcher.on("linkClicked", el => {
    linkClicked = true;
    // lastElementClicked = el
  });
  Barba.Dispatcher.on("transitionCompleted", () => {
    linkClicked = false;
    // lastElementClicked = null
    document.body.classList.remove("no-scroll");
  });

  Barba.Dispatcher.on(
    "newPageReady",
    (currentStatus, prevStatus, HTMLElementContainer, newPageRawHTML) => {
      // safari needs some time, because it freezes without timeout on back swipe
      setTimeout(() => initAll(HTMLElementContainer));
    }
  );

  const isSafari = /^((?!chrome|android).)*safari/i.test(
    window.navigator.userAgent
  );

  Barba.Pjax.getTransition = function() {
    if (isSafari && !linkClicked) return HideShowTransition;

    const nextUrl = document.location.pathname;

    let prev = currentUrl.split("/").length;
    let next = nextUrl.split("/").length;

    let outClass;
    let inClass;
    if (prev === next || (prev <= 2 && next <= 2)) {
      outClass = "pt-page-moveToLeft";
      inClass = "pt-page-scaleUp";
    } else {
      if (next > prev) {
        outClass = "pt-page-scaleDownUp";
        inClass = "pt-page-scaleUp";
      } else {
        // outClass = 'pt-page-scaleDownCenter'
        // inClass = 'pt-page-scaleUpCenter'

        outClass = "pt-page-scaleDown";
        inClass = "pt-page-scaleUpDown";
      }
    }

    currentUrl = nextUrl;

    // return createTransition('pageOut', 'pageIn')
    return createTransition(outClass, inClass);
  };
});
