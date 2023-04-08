const config = {
  appName: "Swords of Blood",
  defaultLanguage: "en",
  tokenSymbol: "$SWDTKN",
  tokenAddress: "0x399D1cfef34c55D6b561AAF053cf0F19D48Bd82B",
  web3SessionDuration: 120,
  coinDecimals: 18,
  ETHEREUM: {
    explorerUrl: "https://etherscan.com",
    coinName: "Ethereum",
    coinSymbol: "ETH",
    chainName: "Ethereum Mainnet",
    chainIdHex: "0x1",
    chainId: 1,
    chainRpc: "https://mainnet.infura.io/v3/38e5c3d3b5b64987aa87fdf3d7580d2c",
  },
  DEV_BSC: {
    explorerUrl: "https://testnet.bscscan.com/",
    coinName: "Binance Coin",
    coinSymbol: "tBNB",
    chainName: "BNB Smart Chain Testnet",
    chainIdHex: "0x61",
    chainId: 97,
    chainRpc: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  },
};

if (process.env.NODE_ENV === "development") {
  config.USDTAddress = "0x018409ad1d630c7049d5bddfe7077e3a92ab6397";
  config.USDCAddress = "0xa2b575f14ed1b67b35370ab951c51f826d0f36f5";
  config.BUSDAddress = "0x6e7d1a2a7c23fccf304eb91cec86792596f57342";
  config.DAIAddress = "0x52709a454e2cc07eaa8c53b82a65016430334b8a";
  config.presaleAddress = "0x8b1c54c1b7b3bf2419d8f9d34afc3524e1705d86";
} else if (process.env.NODE_ENV === "production") {
  config.USDTAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
  config.USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  config.BUSDAddress = "0x4Fabb145d64652a948d72533023f6E7A623C7C53";
  config.DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  config.presaleAddress = "0xa28f064bab1bfaf5652cfc79ee6305f93e07b2f7"; //Old: 0x1d99A6742C8cCd7d390dCdd9079F06e198A547d6
}

export { config };
