import 'jquery.appear'

export default {
  visiblePage (cb) {
    $('.page').appear(function () {
      cb($(this).find('.page-number').text())
    })
  },
  scrollToEle (ele) {
    const $ele = $(ele)
    $('html, body').animate({
      scrollTop: $ele.offset().top - 110
    }, 2000)
  },
  scrollTop () {
    $('html, body').animate({
      scrollTop: $('.page-2').offset().top
    }, 1500)
  },
  reload () {
    location.reload(true)
  },
  makeTitle: (title, subTitle) => `${title}: ${subTitle}`
}
