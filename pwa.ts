import { registerSW } from 'virtual:pwa-register'

export function registerPWA() {
  const updateSW = registerSW({
    onNeedRefresh() {
      // Show a confirmation prompt to the user
      if (confirm('New content available. Reload?')) {
        updateSW(true)
      }
    },
    onOfflineReady() {
      console.log('App ready to work offline')
      // Here you could show a notification to the user
    },
  })

  return updateSW
}