import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ColorChanger from './ColorChanger.jsx'
import PasswordGenerator from './PasswordGenerator.jsx'
import ThemeContextProvider from './ThemeContextProvider.jsx'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		{/* <ColorChanger /> */}
		<ThemeContextProvider>
			<PasswordGenerator />
		</ThemeContextProvider>
	</StrictMode>,
)
