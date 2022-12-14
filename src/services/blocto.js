import BloctoSDK from '@blocto/sdk';

const bloctoSDK = new BloctoSDK({
  aptos: {
    chainId: 2, // 1 for mainnet, 2 for testnet
  },

  appId: '93755015-b89f-48a5-bffe-c25cc5708386',
});

export default bloctoSDK