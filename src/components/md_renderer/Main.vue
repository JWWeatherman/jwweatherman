<template>
  <b-row id="md-app" class="text-center">
    <b-alert :show="dismissCountDown"
             dismissible
             :variant="copyStatus"
             @dismissed="dismissCountdown=0"
             @dismiss-count-down="countDownChanged">
      <p>{{ clipboardLink }}</p>
      <hr>
      <p>{{ copyMessage }}</p>
    </b-alert>
    <b-col id="text-zone" sm="12"	md="10"	lg="8"	xl="6">
      <div id="pages" cols="12">

          <div
            v-for="(id, ind) in hTagIds"
            :key="'social:' + ind"
            class="social-zone"
            :id="'social-' + id"
          >
            <Social
              :state="mdState"
              :id="id"
            ></Social>
            <span>
              <i class="fa fa-clipboard"
                 title="Copy link to clipboard"
                 @click="copyClipboard($event, id)"
              ></i>
            </span>
          </div>

        <div id="page-actual">
          <b-col
            v-for="(md, ind) in markupList"
            class="page"
            :class="'page-' + ind"
            :key="'page:' + ind"
            id="md-body"
            v-html="md"
          ></b-col>
        </div>
      </div>
      <text id="clipboardTextDummy"></text>
      <RightBar
        :state="mdState"
      ></RightBar>
    </b-col>
  </b-row>
</template>
<script>
  import Social from './Social'
  import RightBar from './RightBar'
  import utils from './services/utils'
  import MdState from './services/MdState'

  export default {
    name: 'Main',
    beforeMount () {
      const c = {
        COMPANY_NAME: `JW Weatherman`,
        PUBLISH_DATE: `October 2017`,
        DOMAIN: window.location.href.split('#')[0] + '#/',
        DESCRIPTION: `A security review of the Bitcoin cryptocurrency`,
        TITLE: `Bitcoin Threat Model`,
        FAVICON: `http://res.cloudinary.com/loristeeth/image/upload/v1511128064/Small_btc_logo__y588lv.png`,
        QUOTE: `With e-currency based on cryptographic proof, without the need to trust a third party middleman, money can be secure and transactions effortless.`,
        HASHTAGS: `#bitcoin, #btc, #blockchain, #cryptocurrency, #forex, #crypto, #free`,
        REPO_URL: 'https://api.github.com/repos/JWWeatherman/bitcoin_security_threat_model/readme',
        REDDIT_SUBMIT: (headingId, title) => `https://reddit.com/submit?url=${window.location.href.split('#')[0]}${'%23/' + headingId}&title=${title}`,
        REDDIT_LINK_WANTED: false
      }
      this.mdState = new MdState({config: c}, this.processPages)
      console.log(this.mdState)
    },
    data () {
      return {
        mdState: null,
        popoverOpen: false,
        hTagIds: [],
        clipboardLink: '',
        copyStatus: null,
        dismissSecs: 2,
        dismissCountDown: 0
      }
    },
    computed: {
      toc () {
        return this.mdState.tableContents
      },
      markupList () {
        return this.mdState.markupList
      },
      pageHeading () {
        return this.mdState.pageHeading
      },
      headingPageHeading () {
        return this.mdState.headingPageHeading
      },
      domain () {
        return this.mdState.config.DOMAIN
      },
      copyMessage () {
        if (this.copyStatus === 'success') {
          return `
            Copied to clipboard!
          `
        } else {
          return `
            Not able to copy to clipboard.
          `
        }
      }
    },
    methods: {
      copyClipboard (evt, id) {
        this.clipboardLink = this.domain + id

        const inp = document.createElement('input')
        document.body.appendChild(inp)
        inp.value = this.clipboardLink
        inp.select()
        document.execCommand('copy', false)
        inp.remove()

        this.onCopy()
      },
      onCopy () {
        this.copyStatus = 'success'
        this.showAlert()
      },
      onError () {
        this.copyStatus = 'danger'
        this.showAlert()
      },
      countDownChanged (dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert () {
        this.dismissCountDown = this.dismissSecs
        this.clearClipData(this.dismissSecs)
      },
      clearClipData (seconds) {
        setTimeout(_ => {
          this.copyStatus = null
          this.clipboardLink = ''
        }, seconds * 1000)
      },
      processPages () {
        const dis = this
        setTimeout(() => {
          const $page = $('.page')

          /*
          * implements bootstrap img-fluid on all images
          * */
          $page.find('img').addClass('img-fluid')

          /*
          * places page headers to all pages
          * */
          $page.find('.navbar').remove()
          $page.find('pre').remove()
          $page.not(':first').prepend(this.pageHeading)

          /*
          * appends heading to heading page
          * */
          const $page0 = $('.page-0')
          $page0.find('.jumbotron').remove()
          $page0.append(this.headingPageHeading)

          /*
          * dynamically creates click handlers for toc a tags
          * */
          const $page2 = $('.page-2')
          $page2.find('a').on('click', function () {
            const name = $(this).attr('name')
            utils.scrollToEle('#' + name)
          }).on('mouseover', function () {
            $(this).parent().addClass('hover-color')
          }).on('mouseleave', function () {
            $(this).parent().removeClass('hover-color')
          })

          /*
          * get all htag ids to for popover to be associated with
          * */
          $page.find('h1, h2, h3, h4').each(function () {
            const $ele = $(this)
            const $eleId = $ele.attr('id')
            if ($eleId !== undefined) dis.hTagIds.push($eleId)
          })

          /*
          * scroll to desired element on page load if exists in url
          * */
          const params = window.location.href.split('tm/')[1]
          if (params !== undefined) {
            const headingId = params.replace('/', '')
            if (headingId !== '' && headingId !== undefined) {
              utils.scrollToEle('#' + headingId)
              this.$router.push('/')
            }
          }

          /*
          * adds media queries to elements
          * */
          const hTags = $('h1, h2, h3, h4')
          hTags.each(function () {
            $(this).attr('class', 'tiny-h-font small-h-font medium-h-font')
          })

          /*
          *
          * */
          hTags.each(function () {
            $(this).mouseenter(function () {
              const $ele = $(this)
              const id = $ele.attr('id')
              if (id !== 'heading-page-header') {
                $ele.before(function () {
                  const $social = $('#social-' + id)
                  $ele.prepend($social)
                  $social.css({
                    'display': 'inline-block',
                    'background-color': $ele.css('color'),
                    'margin-right': '10px'
                  })
                })
              }
            })
            $(this).mouseleave(function () {
              $(this).find('.social-zone').css({'display': 'none'})
            })
          })
        }, 200)
      }
    },
    components: {
      Social,
      RightBar
    }
  }
</script>

<style>
  @import './css/style.css';
  @import './css/media.css';
</style>
