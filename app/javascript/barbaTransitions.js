import Barba from 'barba.js'

export const HideShowTransition = Barba.BaseTransition.extend({
  start() {
    this.newContainerLoading.then(this.finish.bind(this))
  },

  finish() {
    // safari needs some time, because it freezes without timeout
    setTimeout(() => {
      window.scrollTo(0, 0)
      this.done()
    })
  }
})

// some page transitions examples
// https://codepen.io/djmarland/pen/CxEbK
// https://codepen.io/jcoulterdesign/pen/EPNrzg
export const FadeTransition = Barba.BaseTransition.extend({
  start() {
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
