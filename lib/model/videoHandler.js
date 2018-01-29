import { allVideos } from '../videoServices'

module.exports = {
  getVideos (req, res) {
    const param = req.params.amount
    const amount = Number(param) || 0
    allVideos(amount, res)
  }
}
