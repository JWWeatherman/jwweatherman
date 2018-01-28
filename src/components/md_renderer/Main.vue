<template>
    <div id="md-app" class="text-center fadeIn" v-if="mdState !== null">
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
      <div id="text-zone" class="row">
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
              v-for="(hp, ind) in headingPage"
              class="page heading medium-font small-font tiny-font"
              :class="'heading-' + ind"
              :key="'heading-' + ind"
              v-html="hp"
            >
            </b-col>
            <b-col
              v-for="(ip, ind) in introductionPage"
              class="page introduction medium-font small-font tiny-font"
              :class="'introduction-' + ind"
              :key="'introduction-' + ind"
              v-html="ip"
            >
            </b-col>
            <b-col
              v-for="(rp, ind) in revisionHistoryPage"
              class="page revision medium-font small-font tiny-font"
              :class="'revision-' + ind"
              :key="'revision-' + ind"
              v-html="rp"
            >
            </b-col>
            <b-col
              v-for="(tp, ind) in tableOfContentsPage"
              class="page table-of-contents medium-font small-font tiny-font"
              :class="'table-of-contents-' + ind"
              :key="'table-of-contents-' + ind"
              v-html="tp"
            >
            </b-col>
            <b-col
              v-for="(mp, ind) in mainContent"
              class="page main-content medium-font small-font tiny-font"
              :class="'page-' + ind"
              :key="'page:' + ind"
              v-html="mp"
            ></b-col>
          </div>
        </div>
        <text id="clipboardTextDummy"></text>
        <RightBar
          :threatModel="threatModel"
          :state="mdState"
        ></RightBar>
      </div>
    </div>
</template>
<script>
  import Social from './Social'
  import RightBar from './RightBar'
  import utils from './services/utils'
  // import MdState from './services/MdState'

  import axios from 'axios'

  export default {
    name: 'Main',
    beforeMount () {
      const location = window.location.href
      this.threatModel = location.split('/#/')[1].split('#')[0]
      axios.get('/api/getTm/' + this.threatModel)
        .then(res => {
          console.log(res.data)
        })
        .catch(console.error)
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
      configTitle () {
        return 'Threat Model'
      },
      configs () {
        return this.$store.getters.getDocumentConfigs
      },
      headingPage () {
        return this.mdState.headingPage
      },
      introductionPage () {
        return this.mdState.introduction
      },
      revisionHistoryPage () {
        return this.mdState.revisionHistory
      },
      tableOfContentsPage () {
        return this.mdState.tableOfContents
      },
      mainContent () {
        return this.mdState.mainContent
      }
    },
    methods: {
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
          * dynamically creates click handlers for toc a tags
          * */
          const $tableOfContents = $('.table-of-contents')
          $tableOfContents.find('a').on('click', function () {
            const name = $(this).attr('name')
            utils.scrollToEle(dis, '#' + name)
          })

          /*
          * split toc page
          * */

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
          const hTags = $('.page:not(:first-child) h1, .page:not(:first-child) h2, .page:not(:first-child) h3, .page:not(:first-child) h4')
          hTags.each(function () {
            $(this).attr('class', 'tiny-h-font small-h-font medium-h-font')
          })

          const strongTags = $('strong')
          strongTags.each(function () {
            $(this).attr('class', 'tiny-strong-font small-strong-font medium-strong-font')
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

<style scoped>
  @import './css/style.css';
  @import './css/media.css';
</style>
