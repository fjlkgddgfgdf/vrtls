// export const wagmiConfig = wagmiAdapter.wagmiConfig;
import { cookieStorage, createStorage } from 'wagmi';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { mainnet, bsc, solana } from '@reown/appkit/networks';

// Get projectId from https://cloud.reown.com
export const projectId =
   process.env.NEXT_PUBLIC_REOWN_PROJECT_ID ||
   'b56e18d47c72ab683b10814fe9495694'; // this is a public projectId only to use on localhost

if (!projectId) {
   throw new Error('Project ID is not defined');
}

export const networks = [mainnet, bsc, solana];

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
   storage: createStorage({
      storage: cookieStorage
   }),
   ssr: true,
   projectId,
   networks,
   featuredWalletIds: [
      'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa' // solflare
   ]
});

export const config = wagmiAdapter.wagmiConfig;
