import base64 from 'js-base64'
import marked from 'marked'
import toc from './toc'
import utils from './utils'

class BuildPage {
  constructor () {
    this.state = null
    this.footnoteId = 1
  }

  /*
  * Split md contents into pages on '---' horizontal rule
  * @var markIt converts md to html
  * @var addPageNum adds page-num attr to each element on page
  * @var reStringIt converts html back into string
  *
  * slice at end is only needed if user puts hr at end of md, THIS MAY NEED TO BE REMOVED
  * */
  createPages (md) {
    return md.split('---').map((md, ind) => {
      return marked(md, { sanitize: true })
    }).slice(0, -1)
  }

  /*
  * add appropriate numbering to all h tag
  * */
  numberHeadings (markupList) {
    let h1Level = 0
    let h2Level = 0
    let h3Level = 0
    let h4Level = 0
    const addEm = markupList.slice(3).map(page => {
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
    const output = markupList.slice(0, 3).concat(addEm)
    return output
  }

  /*
  * add revision history page
  * */
  addRevisionHistory (REPO_URL) {
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

  /*
  * create table of contents
  * @var tocData concats markupList 2 thru end
  * @state.tableContents creates table of contents (see ../services/toc.js)
  * @state.markupList.splice adds toc at index 2 of document
  * */
  createToc (tocData) {
    return toc({$ele: $(`<div>${tocData}</div>`)})
  }

  addHeadingToToc (tocPage) {
    return `<h1>Table of Contents</h1>` + tocPage
  }

  /*
  * add footer to pages
  * */
  addPageFooter (markupList) {
    return markupList.slice(0, 1).concat(markupList.slice(1).map(page => {
      return page + `<div class="page-footer">
        <div class="footer-left"></div>
        <div class="footer-right tiny-h-font small-h-font medium-h-font"></div>
      </div>`
    }))
  }

  /*
  * place reddit link to footer
  * */
  addRedditLink ({markupList, REDDIT_SUBMIT, TITLE}) {
    return markupList.map((page, ind) => {
      const $page = $(page)
      if (ind > 2) {
        const $ele = $page.first()
        const id = $ele.attr('id')
        const subTitle = $ele.text()
        const SUBMIT_URL = REDDIT_SUBMIT(id, utils.makeTitle(TITLE, subTitle))
        const $footerLeft = $page.last().find('.footer-left')
        $footerLeft.append(`<div class="reddit"><a href="${SUBMIT_URL}" class="reddit-a-tag" target="_blank" title="Join Discussion on Reddit">
          <img src="//www.redditstatic.com/spreddit1.gif" alt="submit to reddit" border="0" />  Discussion on r/Bitcoin
        </a></div>`)
      }
      return $('<div>').append($page).remove().html()
    })
  }

  /*
  * adds resource links to footer
  * */
  addResourceLinks (markupList) {
    return markupList.map((page, ind) => {
      const $page = $(page)
      if (ind > 3) {
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
      }
      return $('<div>').append($page).remove().html()
    })
  }

  /*
  * places page number in page footer
  * */
  addPageNumbers (markupList) {
    return markupList.map((page, ind) => {
      const $page = $(page)
      if (ind > 0) {
        $page.last().find('.footer-right').append(`<span class="page-number">${ind > 0 ? ind : ''}</span>`)
      }
      return $('<div>').append($page).remove().html()
    })
  }

  /*
  * @var $l0 gets the h1 tag from the first page
  * this will be use to dynamically append a heading onto every page in the doc
  * */
  createHeading (headingPage) {
    const $l0 = $(headingPage)
    return $l0.filter('h1').text()
  }

  /*
  * @state.heading is the heading that is appended on each page
  * */
  createPageHeading ({heading, COMPANY_NAME}) {
    return `
      <nav variant="faded" class="navbar navbar-default" role="navigation">
        <b-nav-text class="pull-left">${heading}</b-nav-text>
        <b-nav-text class="pull-right">${COMPANY_NAME}</b-nav-text>
      </nav>
    `
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
    document.title = TITLE
  }

  /*
  * add favicon
  * */
  addFavicon (FAVICON) {
    const linkTag = document.createElement('link')
    linkTag.setAttribute('rel', 'shortcut icon')
    linkTag.setAttribute('type', 'image/png')
    linkTag.setAttribute('href', FAVICON)
    document.head.appendChild(linkTag)
  }

  init ({state, mdBlob}, cb) {
    const b64 = base64.Base64
    this.state = state
    this.state.md = b64.decode(mdBlob)
    this.state.markupList = this.createPages(this.state.md)

    this.state.markupList.splice(2, 0, this.addRevisionHistory(this.state.config.REPO_URL))
    this.state.markupList = this.addPageNumberToElements(this.state.markupList)

    this.state.markupList = this.numberHeadings(this.state.markupList)
    this.state.tableContents = this.createToc(this.state.markupList[2].concat(this.state.markupList.slice(3)))
    this.state.markupList.splice(2, 0, $(this.state.tableContents).prop('outerHTML'))
    this.state.markupList[2] = this.addHeadingToToc(this.state.markupList[2])
    this.state.markupList = this.addPageFooter(this.state.markupList)
    this.state.markupList = this.addResourceLinks(this.state.markupList)
    this.state.markupList = this.addPageNumbers(this.state.markupList)
    this.state.heading = this.createHeading(this.state.markupList[0])
    this.state.pageHeading = this.createPageHeading({heading: this.state.heading, COMPANY_NAME: this.state.config.COMPANY_NAME})
    this.state.headingPageHeading = this.createHeadingPageHeading({COMPANY_NAME: this.state.config.COMPANY_NAME, PUBLISH_DATE: this.state.config.PUBLISH_DATE})
    this.addTitle(this.state.config.TITLE)
    this.addFavicon(this.state.config.FAVICON)

    if (this.state.config.REDDIT_LINK_WANTED) {
      this.state.markupList = this.addRedditLink({markupList: this.state.markupList, REDDIT_SUBMIT: this.state.config.REDDIT_SUBMIT, TITLE: this.state.config.TITLE})
    }
    cb()
  }
}

const buildPage = new BuildPage()
export default buildPage.init.bind(buildPage)
