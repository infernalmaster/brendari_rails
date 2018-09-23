import Swipejs from 'swipejs'
import Muuri from 'muuri'
import LazyLoad from '../lazyload'
import loadScriptIfWasNot from '../loadScript'
import 'intersection-observer'
import Barba from 'barba.js'

// "cta": "^0.3.2",
// import cta from 'cta'
// document.addEventListener('turbolinks:click', function () {
//   console.log('click')
//   const e1 = document.querySelectorAll('.big-plate')[2]
//   const e2 = document.querySelector('.fs-anim')
//   cta(e1, e2, { relativeToWindow: true }, function () {
//     e2.classList.add('show')
//   })
// })

function initAll(ctx) {
  // grid
  const msnryContainer = ctx.querySelector('.js-msnry')
  if (msnryContainer) {
    // && document.body.clientWidth > 1023
    msnryContainer.classList.add('js-activated')

    const grid = new Muuri(msnryContainer, {
      items: '.msnry-item',
      // disable animations because safari doesn't support web-animations
      layoutDuration: 0,
      layout: {
        fillGaps: true,
        horizontal: false,
        alignRight: false,
        alignBottom: false,
        rounding: false
      }
    })

    let loading = false
    const observer = new IntersectionObserver(
      ((entries) => {
        entries.forEach(function(entry) {
          if (entry.intersectionRatio > 0 && !loading) {
            loading = true

            Rails.ajax({
              type: 'GET',
              url: document.location.pathname,
              data: `skip=${msnryContainer.childElementCount}`,
              beforeSend: () => true, // looks like bug
              success: data => {
                if (data.body.children.length > 0) {
                  grid.add(data.body.children)
                  new LazyLoad()
                } else {
                  observer.disconnect()
                }
              },
              error: err => {
                console.log(err)
              },
              complete: () => {
                loading = false
              }
            })
          }
        })
      }),
      {
        root: null,
        rootMargin: '500px',
        threshold: [0]
      }
    )
    observer.observe(ctx.querySelector('.main-footer'))
  }

  // https://maps.googleapis.com/maps/api/staticmap?key=YOUR_API_KEY&center=48.922339205993204,24.709867111624362&zoom=17&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0x333333&style=element:labels%7Cvisibility:off&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x757575&style=element:labels.text.stroke%7Ccolor:0x212121&style=feature:administrative%7Celement:geometry%7Ccolor:0x757575&style=feature:administrative.country%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:administrative.neighborhood%7Cvisibility:off&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.park%7Celement:geometry%7Ccolor:0x181818&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:poi.park%7Celement:labels.text.stroke%7Ccolor:0x1b1b1b&style=feature:road%7Celement:geometry.fill%7Ccolor:0x1d1d1d&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x8a8a8a&style=feature:road.arterial%7Celement:geometry%7Ccolor:0x373737&style=feature:road.arterial%7Celement:geometry.fill%7Ccolor:0x1d1d1d&style=feature:road.highway%7Celement:geometry%7Ccolor:0x3c3c3c&style=feature:road.highway.controlled_access%7Celement:geometry%7Ccolor:0x4e4e4e&style=feature:road.local%7Celement:geometry.fill%7Ccolor:0x282828&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:water%7Celement:geometry%7Ccolor:0x000000&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x3d3d3d&size=480x360

  // GMAP
  const gmapsEls = ctx.querySelectorAll('.js-gmap')
  if (gmapsEls.length > 0) {
    loadScriptIfWasNot(
      `http://maps.google.com/maps/api/js?key=${
        document.body.dataset.gmapApiKey
      }`,
      () => {
        gmapsEls.forEach(el => {
          const mapOptions = {
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: new google.maps.LatLng(0, 0),
            disableDefaultUI: el.classList.contains('js-map-no-ui'),
            mapTypeControl: false,
            styles: [
              {
                elementType: 'geometry',
                stylers: [
                  {
                    color: '#333333'
                  }
                ]
              },
              {
                elementType: 'labels.icon',
                stylers: [
                  {
                    visibility: 'off'
                  }
                ]
              },
              {
                elementType: 'labels.text.fill',
                stylers: [
                  {
                    color: '#757575'
                  }
                ]
              },
              {
                elementType: 'labels.text.stroke',
                stylers: [
                  {
                    color: '#212121'
                  }
                ]
              },
              {
                featureType: 'administrative',
                stylers: [
                  {
                    visibility: 'off'
                  }
                ]
              },
              {
                featureType: 'landscape.man_made',
                stylers: [
                  {
                    visibility: 'off'
                  }
                ]
              },
              {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [
                  {
                    color: '#757575'
                  }
                ]
              },
              {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [
                  {
                    color: '#2c2c2c'
                  }
                ]
              },
              {
                featureType: 'road',
                elementType: 'geometry.fill',
                stylers: [
                  {
                    color: '#1d1d1d'
                  }
                ]
              },
              {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [
                  {
                    color: '#8a8a8a'
                  }
                ]
              },
              {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [
                  {
                    color: '#373737'
                  }
                ]
              },
              {
                featureType: 'road.arterial',
                elementType: 'geometry.fill',
                stylers: [
                  {
                    color: '#1d1d1d'
                  }
                ]
              },
              {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry',
                stylers: [
                  {
                    color: '#4e4e4e'
                  }
                ]
              },
              {
                featureType: 'road.local',
                stylers: [
                  {
                    weight: 3
                  }
                ]
              },
              {
                featureType: 'road.local',
                elementType: 'geometry.fill',
                stylers: [
                  {
                    color: '#282828'
                  }
                ]
              },
              {
                featureType: 'road.local',
                elementType: 'labels.text.fill',
                stylers: [
                  {
                    color: '#616161'
                  }
                ]
              },
              {
                featureType: 'transit',
                elementType: 'labels.text.fill',
                stylers: [
                  {
                    color: '#757575'
                  }
                ]
              },
              {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [
                  {
                    color: '#000000'
                  }
                ]
              },
              {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [
                  {
                    color: '#3d3d3d'
                  }
                ]
              }
            ]
          }
          const map = new google.maps.Map(el, mapOptions)
          const marker = new google.maps.Marker({
            position: new google.maps.LatLng(48.923564, 24.711256),
            icon: {
              path:
                'M21.216.014C10.26.397 1.156 8.924.106 19.804-.11 21.982.013 24.09.398 26.11c0 0 .033.235.146.687.34 1.51.848 2.977 1.48 4.352 2.206 5.21 7.306 13.926 18.75 23.41.7.587 1.73.587 2.44 0 11.444-9.472 16.544-18.19 18.76-23.422.644-1.376 1.142-2.83 1.48-4.353.103-.44.148-.688.148-.688.26-1.353.396-2.74.396-4.16C44 9.553 33.722-.427 21.216.013zM22 34c-6.076 0-11-4.924-11-11s4.924-11 11-11 11 4.924 11 11-4.924 11-11 11z',
              fillColor: '#FF0D35',
              fillOpacity: 1,
              anchor: new google.maps.Point(22, 55),
              strokeWeight: 0
            },
            map
          })
          map.panTo(marker.getPosition())
        })
      }
    )
  }

  // MENU
  const menu = ctx.querySelector('.js-menu')
  ctx.querySelector('.js-open-menu').addEventListener('click', (e) => {
    e.preventDefault()
    document.body.classList.add('no-scroll')
    menu.classList.add('is-active')
  })
  ctx.querySelector('.js-close-menu').addEventListener('click', (e) => {
    e.preventDefault()
    document.body.classList.remove('no-scroll')
    menu.classList.remove('is-active')
  })

  // fix position for contacts page
  ;(() => {
    const contactsText = ctx.querySelector('.js-contacts-text')
    if (!contactsText) return
    const homeLink = ctx.querySelector('.main-nav-link.link-home')

    function fixPosition() {
      if (window.innerWidth > 1023) {
        const left = homeLink.getBoundingClientRect().x
        contactsText.setAttribute('style', `padding-left: ${left}px`)
      } else {
        contactsText.removeAttribute('style')
      }
    }
    fixPosition()

    let resizeTimer
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(fixPosition, 100)
    })
  })()

  // gifs player on logos page
  ;(() => {
    let video
    ctx.addEventListener('mouseover', (e) => {
      if (e.target && e.target.classList.contains('js-play')) {
        video = document.createElement('video')
        video.src = e.target.dataset.video
        video.autoplay = true
        video.loop = true
        video.classList.add('msnry-logo-video')
        e.target.parentNode.append(video)
      }
    })
    ctx.addEventListener('mouseout', (e) => {
      if (e.target && e.target.classList.contains('js-play')) {
        video.remove()
      }
    })
  })()
  ;(() => {
    const btn = ctx.querySelector('.js-play-home-video')
    const video = ctx.querySelector('.js-home-video')
    if (video) {
      btn.addEventListener('mouseover', e => {
        video.currentTime = 0
        video.play()
      })
      btn.addEventListener('mouseout', e => {
        video.pause()
      })
    }
  })()

  // Home mobile slider
  if (ctx.querySelector('.js-swipe')) {
    const video = ctx.querySelector('.js-home-mob-video')
    const dots = ctx.querySelectorAll('.js-mob-dot')
    const homeSlider = new Swipejs(ctx.querySelector('.js-swipe'), {
      draggable: true,
      continuous: false,
      // disableScroll: true,
      // stopPropagation: true,
      // callback: function (index, element) {},
      transitionEnd(index, element) {
        dots.forEach(d => d.classList.remove('is-active'))
        dots[index].classList.add('is-active')

        if (index === 3) {
          video.play()
        } else {
          video.pause()
          video.currentTime = 0
        }
      }
    })

    dots.forEach((d, index) =>
      d.addEventListener('click', e => {
        homeSlider.slide(index, 300)
      })
    )
  }

  new LazyLoad()
  new LazyLoad(ctx.querySelectorAll('.load-now')).loadAndDestroy()
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => initAll(document))
  Barba.Pjax.start()
  Barba.Prefetch.init()

  let linkClicked = true
  // let lastElementClicked = null
  Barba.Dispatcher.on('linkClicked', el => {
    linkClicked = true
    // lastElementClicked = el
  })
  Barba.Dispatcher.on('transitionCompleted', () => {
    linkClicked = false
    // lastElementClicked = null
    document.body.classList.remove('no-scroll')
  })

  const HideShowTransition = Barba.BaseTransition.extend({
    start() {
      this.newContainerLoading.then(this.finish.bind(this))
    },

    finish() {
      // safari needs some time, because it freezes without timeout
      setTimeout(() => {
        window.scrollTo(0, 0)
        initAll(this.newContainer)
        this.done()
      })
    }
  })

  // some page transitions examples
  // https://codepen.io/djmarland/pen/CxEbK
  // https://codepen.io/jcoulterdesign/pen/EPNrzg
  const FadeTransition = Barba.BaseTransition.extend({
    start() {
      this.newContainerLoading.then(() => initAll(this.newContainer))
      Promise.all([this.newContainerLoading, this.fadeOut()]).then(
        this.fadeIn.bind(this)
      )
    },

    fadeOut() {
      return new Promise(resolve => {
        this.oldContainer.classList.add('zoomOut')
        setTimeout(resolve, 300)
      })
    },

    fadeIn() {
      window.scrollTo(0, 0)
      this.newContainer.classList.add('zoomIn')
      this.done()
      setTimeout(() => {
        this.newContainer.classList.remove('zoomIn')
      }, 300)
    }
  })

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
  Barba.Pjax.getTransition = function() {
    if (!isSafari) return FadeTransition

    return linkClicked ? FadeTransition : HideShowTransition
  }
})
