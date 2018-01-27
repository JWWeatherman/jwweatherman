import { updateModels, allConfigs, aConfig } from '../threatModelServices'

module.exports = {
  refreshModels (_, res) {
    updateModels(res)
  },
  getConfigs (_, res) {
    allConfigs(res)
  },
  getConfig (req, res) {
    const configName = req.params.configName
    aConfig({configName: configName, res})
  }
}
