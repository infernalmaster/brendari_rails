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
    Promise.all([this.newContainerLoading, this.pageOut()]).then(
      this.pageIn.bind(this)
    )
  },

  pageOut() {
    return new Promise(resolve => {
      this.oldContainer.classList.add('pageOut')
      setTimeout(resolve, 300)
    })
  },

  pageIn() {
    window.scrollTo(0, 0)
    this.newContainer.classList.add('pageIn')
    this.done()
    setTimeout(() => {
      this.newContainer.classList.remove('pageIn')
    }, 300)
  }
})
