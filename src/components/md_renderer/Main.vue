<template>
    <b-row id="md-app" class="text-center fadeIn" v-if="mdState !== null">
      <b-alert :show="dismissCountDown"
               dismissible
               :variant="copyStatus"
               @dismissed="dismissCountdown=0"
               @dismiss-count-down="countDownChanged"
               class="animated bounceInRight">
        <p>{{ clipboardLink }}</p>
        <hr>
        <p><strong>{{ copyMessage }}</strong></p>
      </b-alert>
      <b-col id="text-zone" sm="12"	md="10"	lg="8"	xl="6">
        <div id="pages" cols="12">

            <div
              v-for="(id, ind) in hTagIds"
              :key="'social:' + ind"
              class="social-zone"
              :id="'social-' + id"
              @click="scrollToo(id)"
            >
              <Social
                :state="mdState"
                :id="id"
              ></Social>
              <span>
                <i class="fa fa-link"
                   title="Clipboard"
                   @click="copyClipboard(id)"
                ></i>
                <!--v-b-tooltip.hover-->
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
          :threatModel="threatModel"
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
      utils.watcher(() => {
        return !Object.keys(this.configs).length
      }, () => {
        const location = window.location.href
        this.threatModel = location.split('/#/')[1].split('#')[0]
        const config = this.configs[this.threatModel]
        if (config) {
          //        console.log(config)
          this.mdState = new MdState({config: config}, this.processPages)
          this.faviconAdder(config.FAVICON)
        } else {
          this.$router.push('/')
        }
      })
    },
    data () {
      return {
        mdState: null,
        popoverOpen: false,
        hTagIds: [],
        clipboardLink: '',
        copyStatus: null,
        dismissSecs: 3,
        dismissCountDown: 0,
        copyMessage: `Copied to clipboard!`,
        threatModel: ''
      }
    },
    computed: {
      configs () {
        return this.$store.getters.getDocumentConfigs
      },
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
      }
    },
    methods: {
      faviconAdder (favicon) {
        /*
        * adds favicon
        * */
        $('head').prepend($(`<link href="${favicon}" rel="shortcut icon" type="image/x-icon">`))
      },
      copyClipboard (id) {
        this.clipboardLink = window.location.href.split('#')[0] + '#/' + this.threatModel + '#' + id

        const inp = document.createElement('input')
        document.body.appendChild(inp)
        inp.value = this.clipboardLink
        inp.select()
        document.execCommand('copy', false)
        inp.remove()

        this.copyStatus = 'success'
        this.showAlert()
      },
      scrollToo (id) {
        utils.scrollToEle(this, '#' + id)
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
          * scroll to element if in url
          * */
          const location = window.location.href
          const gotoEle = location.split('#').pop()
          if (gotoEle !== '/' + this.threatModel) {
            utils.scrollToEle(this, '#' + gotoEle)
          }

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
            utils.scrollToEle(dis, '#' + name)
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
          * adds media queries to elements
          * */
          const hTags = $('h1, h2, h3, h4')
          hTags.each(function () {
            $(this).attr('class', 'tiny-h-font small-h-font medium-h-font')
          })

          /*
          * implements social buttons when mouse over h tag
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
