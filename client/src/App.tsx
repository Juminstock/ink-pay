import './App.css'
import { WagmiConfig, createConfig } from 'wagmi'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import { Nav } from '@/components/layout'

const config = createConfig(
  getDefaultConfig({
    infuraId: import.meta.env.VITE_ALCHEMY_ID,
    walletConnectProjectId: import.meta.env
      .VITE_WALLETCONNECT_PROJECT_ID as string,

    appName: 'Boomie',

    appDescription: 'Your App Description',
    appUrl: 'https://family.co', // your app's url
    appIcon: 'https://family.co/logo.png' // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
)

function App () {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <main className='min-h-screen'>
          <Nav />
          Hello world
        </main>
      </ConnectKitProvider>
    </WagmiConfig>
  )
}

export default App
