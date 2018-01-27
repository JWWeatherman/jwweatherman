import { allVideos } from '../videoServices'

module.exports = {
  getVideos (_, res) {
    allVideos(res)
  }
}
