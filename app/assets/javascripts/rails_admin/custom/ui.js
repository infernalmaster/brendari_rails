$(document).on('ready', function() {
  // grid
  const msnryContainer = document.querySelector('.js-msnry')
  if (msnryContainer) {
    msnryContainer.classList.add('js-activated')

    const g = new Muuri('.msnry', {
      items: '.msnry-item',
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
    }).on('dragReleaseEnd', () => {
      g.synchronize()
      const ids = Array.from(document.querySelectorAll('.msnry-item')).map(el => el.dataset.id)

      $.ajax({
        type: 'POST',
        url: document.location.pathname,
        data: {
          ids: ids.join(','),
        },
        success: (resp) => {
          console.log('saved')
        },
        dataType: 'json'
      })
    })
  }
});
