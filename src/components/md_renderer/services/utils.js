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
      context.$router.push('/threat_model')
    })
  },
  reload () {
    location.reload(true)
  },
  makeTitle: (title, subTitle) => `${title}: ${subTitle}`
}
