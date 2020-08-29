import { MutationNames } from '../mutations/mutations'

export default ({ state, commit }, value) => {
  const settings = state.settings

  settings.cameraActive = value
  commit(MutationNames.SetSettings, settings)
}
