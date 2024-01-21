import { WagmiConfig, createConfig } from 'wagmi'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import { mainnet, goerli, sepolia } from 'wagmi/chains'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home, OnRamp } from './views'
import { Layout } from './components'
const chains = [mainnet, goerli, sepolia]
const config = createConfig(
  getDefaultConfig({
    infuraId: import.meta.env.VITE_ALCHEMY_ID,
    walletConnectProjectId: import.meta.env
      .VITE_WALLETCONNECT_PROJECT_ID as string,

    appName: 'Boomie',

    appDescription: 'Your App Description',
    appUrl: 'https://family.co', // your app's url
    appIcon: 'https://family.co/logo.png', // your app's icon, no bigger than 1024x1024px (max. 1MB)
    chains
  })
)

function App () {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/onRamp/:makerAddress',
          element: <OnRamp />
        }
      ]
    }
  ])

  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <RouterProvider router={router} />
        {/* <main className='h-screen'>
          <Nav />
        </main> */}
      </ConnectKitProvider>
    </WagmiConfig>
  )
}

export default App
