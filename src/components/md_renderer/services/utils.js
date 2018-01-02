import 'jquery.appear'

export default {
  visiblePage (cb) {
    $('.page').appear(function () {
      cb($(this).find('.page-number').text())
    })
  },
  scrollToEle (context, ele) {
    const $ele = $(ele)
    $('html, body').animate({
      scrollTop: $ele.offset().top - 110
    }, 2000, () => {
      context.$router.push(ele)
    })
  },
  scrollTop (context) {
    $('html, body').animate({
      scrollTop: $('.page-2').offset().top
    }, 1500, () => {
      context.$router.push('/' + context.threatModel)
    })
  },
  reload () {
    location.reload(true)
  },
  makeTitle: (title, subTitle) => `${title}: ${subTitle}`,
  /*
    watcher is a watcher function that uses trampolining to watch a value in the store to change. example use case is to watch for an item to be added to a function in order to trigger the next step of the tutorial.
    testFunction is the blocking condition for the trampoline.
  **/
  watcher (testFunction, cb) {
    const trampoline2 = () => {
      setTimeout(() => {
        trampoline1()
      }, 100)
    }

    const trampoline1 = () => {
      let count = 0

      while (testFunction()) {
        count++
        if (count > 100) {
          trampoline2()
          return
        }
      }
      cb()
    }

    trampoline1()
  }
}
