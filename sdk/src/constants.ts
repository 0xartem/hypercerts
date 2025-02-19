/**
 * Constants
 */

import { Deployment, SupportedChainIds } from "./types/index.js";

// Goerli is default if nothing specified
const DEFAULT_CHAIN_ID = 5;

const DEFAULT_GRAPH_BASE_URL = "https://api.thegraph.com/subgraphs/name/hypercerts-admin";

// These are the deployments we manage
const DEPLOYMENTS: { [key in SupportedChainIds]: Deployment } = {
  5: {
    chainId: 5,
    chainName: "goerli",
    contractAddress: "0x822F17A9A5EeCFd66dBAFf7946a8071C265D1d07",
    graphUrl: `${DEFAULT_GRAPH_BASE_URL}/hypercerts-testnet`,
  } as const,
  10: {
    chainId: 10,
    chainName: "optimism-mainnet",
    contractAddress: "0x822F17A9A5EeCFd66dBAFf7946a8071C265D1d07",
    graphUrl: `${DEFAULT_GRAPH_BASE_URL}/hypercerts-optimism-mainnet`,
  } as const,
  11155111: {
    chainId: 11155111,
    chainName: "sepolia",
    contractAddress: "0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941",
    graphUrl: `${DEFAULT_GRAPH_BASE_URL}/hypercerts-sepolia`,
  } as const,
};

// Example schema on Sepolia
// https://sepolia.easscan.org/schema/view/0xe542f797c9407ccb56e539d14c83718bf35c1d0f3c768bc2623aca56badfde51
const EAS_SCHEMAS = {
  sepolia: {
    duplicate: {
      uid: "0xe542f797c9407ccb56e539d14c83718bf35c1d0f3c768bc2623aca56badfde51",
      schema: "uint256 chainId, address contract, uint256 claimId",
    },
    contentHash: {
      uid: "0xdf4c41ea0f6263c72aa385580124f41f2898d3613e86c50519fc3cfd7ff13ad4",
      schema: "bytes32 contentHash",
    },
  },
} as const;

export { DEFAULT_CHAIN_ID, DEPLOYMENTS, EAS_SCHEMAS };
