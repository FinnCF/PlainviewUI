import { Analytics } from '@vercel/analytics/react';
import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { sepolia, optimism, goerli } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { AppProps } from 'next/app'
import '../styles/main.min.scss'
import Layout from '../components/Layout/Layout';
import BlurLoginWeb3 from '../components/Layout/BlurLoginWeb3';
import { useState, createContext } from 'react'; 
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { ReactNode } from 'react';

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [optimism, sepolia],
  [publicProvider()],
)
 
// Set up wagmi config
const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
})



export const CryptoContext = createContext(null);
type RSAKeys = {
  decryptedPrivateRSAKey: Uint8Array | null;
  encryptedPrivateRSAKey: Uint8Array | null;
  publicRSAKey: Uint8Array | null;
};


export const CryptoProvider = ({ children }) => {

  const [rsaKeys, setRSAKeys] = useState<RSAKeys>({
    decryptedPrivateRSAKey: null,
    encryptedPrivateRSAKey: null,
    publicRSAKey: null
  });

  return (
    <CryptoContext.Provider value={{
      rsaKeys,
      setRSAKeys
    }}>
      {children}
    </CryptoContext.Provider>
  );
};


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CryptoProvider>
      <WagmiConfig config={config}>
        <BlurLoginWeb3>
          <Layout>
            <Component {...pageProps} />
            <Analytics />
          </Layout>
        </BlurLoginWeb3>
      </WagmiConfig>
    </CryptoProvider>
  )
}

export default MyApp

