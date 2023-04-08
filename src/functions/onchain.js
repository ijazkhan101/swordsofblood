import { ethers } from 'ethers';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { config } from "./config";
import { SetStorageData, RemoveStorageData } from './common';
import ABI from "./abis";

function CheckMetaMask() {
	if(!window.ethereum) return false;
	if(!window.ethereum.isMetaMask) return false;
	if(window.ethereum.isKuCoinWallet) return false;
	return true;
}

async function ConnectAddress(provider) {
	await provider.send("eth_requestAccounts", []);
}

function CheckNetwork(id, network) {
	let supportedChainIds = [config[network].chainId];
	if(!supportedChainIds.includes(id)) return false;
	return true;
}

async function ActivateWalletConnect(handler, network) {
	try {
		const provider = new WalletConnectProvider({
			rpc: {
				[config[network].chainId]: config[network].chainRpc
			},
			chainId: config[network].chainId,
			network: config[network].chainName,
		});

		await provider.enable();
		provider.updateRpcUrl(config[network].chainId); //fix for wc
		
		provider.on("accountsChanged", async () => {
			await provider.disconnect();
		});

		provider.on("networkChanged", async () => {
			await provider.disconnect();
		});

		provider.on("chainChanged", async () => {
			await provider.disconnect();
		});

		provider.on("disconnect", () => {
			handler();
		});

		return new ethers.providers.Web3Provider(provider);
	} catch(err) {
		return false;
	}
}

async function ActivateMetaMask(handler) {
	try {
		window.ethereum.on('disconnect', () => {
			handler();
		})
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		await ConnectAddress(provider);
		return provider;
	} catch(err) {
		return false;
	}
}

async function GetWalletConnectProvider(handler, network) {
	const provider = await ActivateWalletConnect(handler, network);
	if(!provider) return [false, null];

	if(process.env.NODE_ENV === 'production') {
		const net = await provider.getNetwork();
		if(!CheckNetwork(net.chainId, network)) {
			return [false, 'Please, switch wallet to {NETWORK} network.'];
		}
	}

	return [true, provider];
}

async function GetMetaMaskProvider(handler, network) {
	if(!CheckMetaMask()) return [false, 'You have to install Metamask wallet.'];

	const provider = await ActivateMetaMask(handler);
	if(!provider) return [false, 'Open the MetaMask and connect the account.'];

	const net = await provider.getNetwork();

	if(!CheckNetwork(net.chainId, network)) {
		if(!await AddAndSwitchNetwork(network)) return [false, 'Please, switch wallet to {NETWORK} network.'];
		return await GetMetaMaskProvider(handler, network);
	}

	return [true, provider];
}

async function GetJsonRpcProvider(network) {
	const provider = new ethers.providers.JsonRpcProvider(config[network].chainRpc);
	return [true, provider];
}

async function AddAndSwitchNetwork(network) {
	try {
		await window.ethereum.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: config[network].chainIdHex }],
		});

		return true;
	} catch (switchError) {
		if(switchError.code === 4902) {
			try {
				await window.ethereum.request({
					method: 'wallet_addEthereumChain',
					params: [
						{
							chainName: config[network].chainName,
							chainId: config[network].chainIdHex,
							rpcUrls: [config[network].chainRpc],
							blockExplorerUrls: [config[network].explorerUrl],
							nativeCurrency: {
								name: config[network].coinName,
								symbol: config[network].coinSymbol,
								decimals: config.coinDecimals,
							}
						},
					],
				});

				return true;
			} catch (err) {
				return false;
			}
		}

		return false;
	}
}

export function DisconnectProvider(web3ref) {
	if(web3ref.current.instance && web3ref.current.instance.disconnect) web3ref.current.instance.disconnect();
	web3ref.current.status = false;
	web3ref.current.instance = null;
	RemoveStorageData('lastProvider');
	RemoveStorageData('walletconnect');
}

export async function SetGlobalProvider(type, web3ref) {
	let status, instance;
	const storageName = 'lastProvider';

	const onDisconnect = () => DisconnectProvider(web3ref);

	if(type === 0) [status, instance] = await GetMetaMaskProvider(onDisconnect, web3ref.current.network);
	else if(type === 1) [status, instance] = await GetWalletConnectProvider(onDisconnect, web3ref.current.network);
	else if(type === 2) [status, instance] = await GetJsonRpcProvider(web3ref.current.network);

	if(!status) return [false, instance];

	web3ref.current.status = status
	web3ref.current.instance = instance;
	if(type !== 2) SetStorageData(storageName, JSON.stringify({network: web3ref.current.network.replace('DEV_', ''), type, upts: Math.ceil(Date.now() / 1000) + config.web3SessionDuration}));

	return [true, null];
}

export async function GetAccount(provider) {
	const addresses = await provider.listAccounts();
	return addresses[0] ? addresses[0] : null;
}

export async function GetBalance(provider) {
	const signer = provider.getSigner();
	return await signer.getBalance();
}

export function getPresaleContract(provider, withSigner=false) {
	let signer = withSigner ? provider.getSigner() : provider;
	return new ethers.Contract(config.presaleAddress, ABI.PRESALE, signer);
}

export function getUSDTContract(provider, withSigner=false) {
	let signer = withSigner ? provider.getSigner() : provider;
	return new ethers.Contract(config.USDTAddress, ABI.STANDART_ERC20_TOKEN, signer);
}

export function getUSDCContract(provider, withSigner=false) {
	let signer = withSigner ? provider.getSigner() : provider;
	return new ethers.Contract(config.USDCAddress, ABI.STANDART_ERC20_TOKEN, signer);
}

export function getBUSDContract(provider, withSigner=false) {
	let signer = withSigner ? provider.getSigner() : provider;
	return new ethers.Contract(config.BUSDAddress, ABI.STANDART_ERC20_TOKEN, signer);
}

export function getDAIContract(provider, withSigner=false) {
	let signer = withSigner ? provider.getSigner() : provider;
	return new ethers.Contract(config.DAIAddress, ABI.STANDART_ERC20_TOKEN, signer);
}

export function weiToEther(wei, precision=18) {
	return ethers.utils.formatUnits(wei, precision);
}

export function defaultNetwork(){ 
	return 'ETHEREUM';
}

export function setNetwork(network) {
	return `${process.env.NODE_ENV === 'development' ? 'DEV_' : ''}${network}`;
}