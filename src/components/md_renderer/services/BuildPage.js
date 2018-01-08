import { _ } from 'underscore'
import toc from './toc'

class BuildPage {
  constructor () {
    this.state = null
    this.footnoteId = 1
  }

  /*
  * apply threat model styles
  * */
  applyStyles () {
    const styles = this.state.config.STYLE
    _.mapObject(styles, (style, name) => {
      document.documentElement.style.setProperty(`--${name}`, style)
    })
  }

  /*
  * add appropriate numbering to all h tag
  * */
  numberHeadings (markupList) {
    let h1Level = 0
    let h2Level = 0
    let h3Level = 0
    let h4Level = 0
    const addEm = markupList.slice(this.state.introEnd).map(page => {
      const $page = $(page)
      $page.each((_, ele) => {
        const $ele = $(ele)
        if ($ele.is('h1')) {
          h1Level += 1
          $ele.prepend(`<span>${h1Level} </span>`)
          h2Level = 0
          h3Level = 0
          h4Level = 0
        } else if ($ele.is('h2')) {
          h2Level += 1
          $ele.prepend(`<span>${h1Level}.${h2Level} </span>`)
          h3Level = 1
          h4Level = 1
        } else if ($ele.is('h3')) {
          $ele.prepend(`<span>${h1Level}.${h2Level}.${h3Level} </span>`)
          h3Level += 1
          h4Level = 1
        } else if ($ele.is('h4')) {
          $ele.prepend(`<span>${h1Level}.${h2Level}.${h3Level}.${h4Level} </span>`)
          h4Level += 1
        }
      })
      return $('<div>').append($page).remove().html()
    })
    const output = markupList.slice(0, this.state.introEnd).concat(addEm)
    return output
  }

  /*
  * add revision history page
  * */
  addRevisionHistory ({REPO_URL}) {
    const repo = REPO_URL.replace('api.', '').replace('repos/', '').split('/').slice(0, -1).join('/')
    return `
      <h1 id="revision-page" style="visibility: hidden">Revision history or to contribute</h1>
      <strong>To see the revision history, contribute improvements or point out errors in this document please see the github repo:</strong>
      <a href="${repo}" target="_blank">${repo}</a>
      <strong>If you would like to financially support this, and other bitcoin community projects, buy bitcoin.</strong>
    `
  }

  /*
  * add page number to all elements
  * */
  addPageNumberToElements (markupList) {
    return markupList.map((page, ind) => {
      const $page = $(page)
      const addPageNum = $page.each(function () {
        const $strong = $(this).find('strong')

        $strong.each(function () {
          $(this).attr('page-num', ind + 1)
          $(this).attr('id', $(this).text().toLowerCase().split(' ').join('-') + '-' + ind)
        })

        $(this).attr('page-num', ind + 1)
      })
      return $('<div>').append(addPageNum.clone()).remove().html()
    })
  }

  addHeadingToToc (tocPage) {
    return `<h1>Table of Contents</h1>` + tocPage
  }

  /*
  * add footer to pages
  * */
  addPageFooter (markupList) {
    return markupList.map(page => {
      return page + `<div class="page-footer">
        <div class="footer-left"></div>
        <div class="footer-right tiny-h-font small-h-font medium-h-font"></div>
      </div>`
    })
  }

  /*
  * adds resource links to footer
  * */
  addResourceLinks (markupList) {
    return markupList.map((page, ind) => {
      const $page = $(page)
      const $footerLeft = $page.last().find('.footer-left')
      $footerLeft.append('<div class="resources"></div>')
      $page.find('a').slice(0, this.state.config.REDDIT_LINK_WANTED ? -1 : 100).each((_, ele) => {
        const $originalEle = $(ele)
        $originalEle.replaceWith(`<p> ${$originalEle.text()} <span style="font-size: 75%; vertical-align: top; color: #000; text-decoration: underline">${this.footnoteId} </span> </p>`)
        const href = $originalEle.attr('href')
        // appends tags to left footer
        $footerLeft.find('.resources').append(`<a class="tiny-h-font small-h-font medium-h-font" href="${href}" title="${href}" target="_blank"><span style="font-size: 75%; vertical-align: top; color: #000">${this.footnoteId} </span>${href}</a>`)
        $footerLeft.find('.resources').prepend('<div style="border-top: 0.25px solid #000; width: 30%"></div>')
        this.footnoteId++
      })
      return $('<div>').append($page).remove().html()
    })
  }

  /*
  * places page number in page footer
  * */
  addPageNumbers (markupList) {
    return markupList.map(page => {
      const $page = $(page)
      const number = $page.first().attr('page-num')
      $page.last().find('.footer-right').append(`<span class="page-number">${number}</span>`)
      return $('<div>').append($page).remove().html()
    })
  }

  /*
  * @state.heading is the heading that is appended on each page
  * */
  createPageHeading ({HEADING, COMPANY_NAME}) {
    return `
      <nav variant="faded" class="navbar navbar-default" role="navigation">
        <b-nav-text class="pull-left">${HEADING}</b-nav-text>
        <b-nav-text class="pull-right">${COMPANY_NAME}</b-nav-text>
      </nav>
    `
  }

  appendPageHeader ({page, heading}) {
    return heading + page
  }

  /*
  * @state.headingPageHeading is the heading at the bottom left of the heading page
  * */
  createHeadingPageHeading ({COMPANY_NAME, PUBLISH_DATE}) {
    return `
      <div class="jumbotron">
        <h1 id="heading-page-header">${COMPANY_NAME}</h1>
        <p>${PUBLISH_DATE}</p>
      </div>
    `
  }

  /*
  * add title to page
  * */
  addTitle (TITLE) {
    const docTitle = document.title.split('|')[0].trim()
    document.title = ''
    document.title = docTitle + ' | ' + TITLE
  }

  appendHeadingPageHeader (header) {
    const lastOf = this.state.headingPage.pop()
    this.state.headingPage.push(lastOf + header)
  }

  /*
  * add favicon
  * */
  addFavicon (FAVICON) {
    $('head').prepend($(`<link href="${FAVICON}" rel="shortcut icon" type="image/x-icon">`))
  }

  /*
   * create table of contents
   * @var tocData concats mainContent 2 thru end
   * @state.tableContents creates table of contents (see ../services/toc.js)
   * @state.mainContent.splice adds toc at index 2 of document
   * */
  createTableOfContents (tocData) {
    const $toc = toc({$ele: $(`<div>${tocData}</div>`)})
    return $('<div>').append($toc).remove().html()
  }

  init ({state}, cb) {
    this.state = state
    const config = state.config

    this.applyStyles()

    // add heading page header (jumbotron)
    this.appendHeadingPageHeader(this.createHeadingPageHeading({COMPANY_NAME: config.COMPANY_NAME, PUBLISH_DATE: config.PUBLISH_DATE}))

    // add revision history
    this.state.revisionHistory = [this.addRevisionHistory({REPO_URL: config.REPO_URL})]

    // add heading
    this.state.pageHeading = this.createPageHeading({HEADING: config.TITLE, COMPANY_NAME: config.COMPANY_NAME})
    this.state.introduction = this.state.introduction.map(page => this.appendPageHeader({page: page, heading: this.state.pageHeading}))
    this.state.mainContent = this.state.mainContent.map(page => this.appendPageHeader({page: page, heading: this.state.pageHeading}))
    this.state.revisionHistory = this.state.revisionHistory.map(page => this.appendPageHeader({page: page, heading: this.state.pageHeading}))

    // create main content section
    this.state.mainContent = this.addPageNumberToElements(this.state.mainContent)
    this.state.mainContent = this.numberHeadings(this.state.mainContent)
    this.state.mainContent = this.addPageFooter(this.state.mainContent)
    this.state.mainContent = this.addResourceLinks(this.state.mainContent)
    this.state.mainContent = this.addPageNumbers(this.state.mainContent)

    // create table of contents
    this.state.tableOfContents = [this.createTableOfContents(this.state.mainContent)]

    this.state.introduction = this.addPageFooter(this.state.introduction)
    this.state.tableOfContents = this.addPageFooter(this.state.tableOfContents)

    this.addTitle(this.state.config.TITLE)

    cb()
  }
}

const buildPage = new BuildPage()
export default buildPage.init.bind(buildPage)
