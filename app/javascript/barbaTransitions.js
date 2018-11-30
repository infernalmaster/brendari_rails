import Barba from "barba.js";

export const HideShowTransition = Barba.BaseTransition.extend({
  start() {
    this.newContainerLoading.then(this.finish.bind(this));
  },

  finish() {
    // safari needs some time, because it freezes without timeout
    setTimeout(() => {
      window.scrollTo(0, 0);
      this.done();
    });
  }
});

// some page transitions examples
// https://codepen.io/djmarland/pen/CxEbK
// https://codepen.io/jcoulterdesign/pen/EPNrzg

export function createTransition(outClass, inClass) {
  return Barba.BaseTransition.extend({
    start() {
      Promise.all([this.newContainerLoading, this.pageOut()]).then(
        this.pageIn.bind(this)
      );
    },

    pageOut() {
      return new Promise(resolve => {
        this.oldContainer.classList.add(outClass);
        setTimeout(resolve, 500);
      });
    },

    pageIn() {
      window.scrollTo(0, 0);
      this.newContainer.classList.add(inClass);
      this.done();
      setTimeout(() => {
        this.newContainer.classList.remove(inClass);
      }, 300);
    }
  });
}
