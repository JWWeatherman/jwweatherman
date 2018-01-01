import buildPage from './BuildPage'
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

class MdState {
  constructor ({config}, cb) {
    this.config = config
    this.initializeState(cb)
  }

  markupList = []
  md = ``
  tableContents = ``
  pageHeading = ``
  headingPageHeading = ``
  heading = ``
  scrollPosition = 0
  pageNumber = 0

  initializeState (cb) {
    const config = this.config
    Vue.http.get(config.REPO_URL)
      .then(res => buildPage({state: this, mdBlob: res.body.content}, cb))
      .catch(err => console.error(err))
  }

  updatePageNumber (number) {
    this.pageNumber = number
  }

  updateScrollPosition (percent) {
    this.scrollPosition = percent
  }
}

export default MdState
