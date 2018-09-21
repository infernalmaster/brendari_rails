//= require hammerjs/hammer.js
//= require muuri/muuri.js

$(document).on('ready', function() {
  // grid
  var msnryContainer = document.querySelector('.js-msnry');
  if (msnryContainer) {
    msnryContainer.classList.add('js-activated');

    var g = new Muuri('.msnry', {
      items: '.msnry-item',
      layoutDuration: 0,
      dragReleaseDuration: 0,
      dragEnabled: true,
      dragSort: true,
      dragSortInterval: 20,
      dragSortPredicate: {
        threshold: 60,
        action: 'swap'
      },
      layout: {
        fillGaps: true,
        horizontal: false,
        alignRight: false,
        alignBottom: false,
        rounding: false
      }
    }).on('dragReleaseEnd', function() {
      g.synchronize();
      var ids = Array.from(document.querySelectorAll('.msnry-item'))
        .map(function(el) { return el.dataset.id });

      $.ajax({
        type: 'POST',
        url: document.location.pathname,
        data: {
          ids: ids.join(','),
        },
        success: function(resp) {
          console.log('saved')
        },
        dataType: 'json'
      });
    });
  }
});
