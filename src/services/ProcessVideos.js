import moment from 'moment'
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

class ProcessVideos {
  constructor ({store}) {
    this.$store = store
  }

  process () {
    this.getChannel(items => {
      items.filter(item => item.snippet.liveBroadcastContent !== 'upcoming').slice(0, 5).map(item => {
        const snippet = item.snippet
        const videoId = item.id.videoId
        const vidData = {
          title: snippet.title,
          date: moment(snippet.publishedAt).format('LL'),
          description: snippet.description,
          embedUrl: `https://www.youtube.com/embed/${videoId}`
        }
        this.$store.dispatch('updateVidParts', this.vidTemplate(vidData))
      })
    })
  }

  getChannel (cb) {
    const CHANNEL_ID = 'UCkaB2u7zG4uSCL5Hws3X1jw'
    const KEY = 'AIzaSyCQwWBUt5ZTUgvB8gMQYRUOR1MQlN-GrrU'
    const YOUTUBE_URL = `https://www.googleapis.com/youtube/v3/search?key=${KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=20`
    Vue.http.get(YOUTUBE_URL)
      .then(res => cb(res.body.items))
      .catch(err => console.error(err))
  }

  vidTemplate ({title, date, description, embedUrl}) {
    const template = `
          <div class="row-4 w-row medium-rotate small-rotate tiny-rotate">
            <div class="w-col w-col-2 w-col-medium-8"></div>
            <div class="w-col w-col-3 w-col-medium-8 description-content">
              <h4 class="heading tiny-h-font small-h-font medium-h-font">${title}<br></h4>
              <div class="tiny-font small-font medium-font">${date}</div>
              <div class="paragraph-2 tiny-font small-font medium-font">${description}</div>
            </div>
            <div class="column-5 w-col w-col-5 w-col-medium-6">
              <div style="padding-top:56.17021276595745%" class="video-2 w-embed w-video">
                <iframe class="youtube-embeded" src="${embedUrl}" scrolling="no" frameborder="0" allowfullscreen=""></iframe>
              </div>
            </div>
            <div class="w-col w-col-2"></div>
          </div>
        `
    return template
  }
}

export default ProcessVideos
