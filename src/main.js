import { createApp } from 'vue'
import App from './App'
import components from '@/components/UI'

const app = createApp(App)

components.forEach(components => {
	app.component(components.name, components)
})
app.mount('#app')
