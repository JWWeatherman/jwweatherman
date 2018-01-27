import video from './model/video'

import axios from 'axios'
import moment from 'moment/moment'

function genTemplate ({TITLE, DATE, DESCRIPTION, EMBEDDED_URL}) {
  return `
    <div class="row-4 w-row medium-rotate small-rotate tiny-rotate">
      <div class="w-col w-col-2 w-col-medium-8"></div>
      <div class="w-col w-col-3 w-col-medium-8 description-content">
        <h4 class="heading tiny-h-font small-h-font medium-h-font">${TITLE}<br></h4>
        <div class="tiny-font small-font medium-font">${DATE}</div>
        <div class="paragraph-2 tiny-font small-font medium-font">${DESCRIPTION}</div>
      </div>
      <div class="column-5 w-col w-col-5 w-col-medium-6">
        <div style="padding-top:56.17021276595745%" class="video-2 w-embed w-video">
          <iframe class="youtube-embeded" src="${EMBEDDED_URL}" scrolling="no" frameborder="0" allowfullscreen=""></iframe>
        </div>
      </div>
      <div class="w-col w-col-2"></div>
    </div>   
  `
}

function checkVideos () {
  console.log('STARTING VIDEO UPDATE...')
  const CHANNEL_ID = 'UCkaB2u7zG4uSCL5Hws3X1jw'
  const KEY = 'AIzaSyCQwWBUt5ZTUgvB8gMQYRUOR1MQlN-GrrU'
  const YOUTUBE_URL = `https://www.googleapis.com/youtube/v3/search?key=${KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=20`
  axios.get(YOUTUBE_URL)
    .then(res => {
      const vids = res.data.items.filter(item => item.snippet.liveBroadcastContent !== 'upcoming')
      vids.forEach((videoData, ind) => {
        const snippet = videoData.snippet
        const videoId = videoData.id.videoId
        const vid = {}
        vid.TITLE = snippet.title
        vid.DATE = moment(snippet.publishedAt).format('LL')
        vid.DESCRIPTION = snippet.description
        vid.EMBEDDED_URL = `https://www.youtube.com/embed/${videoId}`
        vid.TEMPLATE = genTemplate(vid)
        video.update({TITLE: vid.TITLE}, vid, {upsert: true})
          .then(data => {
            if (ind === vids.length - 1) console.log('...DONE UPDATING VIDEOS')
          })
          .catch(err => console.error('VIDEO UPDATE ERROR', err))
      })
    })
    .catch(err => console.error(err))
}

function videoCheckInterval () {
  checkVideos()
  setInterval(checkVideos, 120000)
}

function allVideos (res) {
  video.find({})
    .then(videos => res.end(JSON.stringify(videos)))
    .catch(err => res.status(500).end(err))
}

export { videoCheckInterval, allVideos }
