export default {
  scrollToEle (ele) {
    const $ele = $(ele)
    $('html, body').animate({
      scrollTop: $ele.offset().top - 110
    }, 500)
  }
}
