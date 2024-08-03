import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  optimismSepolia
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    optimismSepolia,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [optimismSepolia] : []),
  ],
  ssr: true,
});