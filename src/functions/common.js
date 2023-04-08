import { weiToEther } from "./onchain";

export function importAllImages() {
	let images = {};
	const r = require.context('../images', true, /\.(png|jpe?g|svg|webp)$/)
	r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
	return images
}

export function getCurrentTimestamp () {
	return Math.floor(Date.now() / 1000)
}

export function SetStorageData(name, value) {
	localStorage.setItem(name, value);
}

export function RemoveStorageData(name) {
	localStorage.removeItem(name);
}

export function GetStorageData(name) {
	let item;
	if(localStorage.hasOwnProperty(name)) {
		item = localStorage.getItem(name);
		if(item.length > 0) return item;
	}

	return null;
}

function getCurrentStageLimit(periods, stage) {
	let limit = 0;
	for(let c = 0; c <= stage; c++) limit += periods[c];
	return limit;
}

function getCurrentStage(periods, totalSold) {
	let stage = 0;

	while(totalSold >= getCurrentStageLimit(periods, stage)) {
		stage++;
	}

	return stage;
}

export function calculateUSDValues(totalTokensSold, periodSize, currentStage, totalPeriods, salePrices) {
	let totalUSDRaised = 0;
	let totalUSD = 0;
	let stageTotalUSD = 0;
	let stageUSDRaised = 0;
	let stageTotalTokensTarget = 0;
	let stageTotalUSDTarget = 0;
	let roundedPeriods = 0;
	for(let curStage = 0; curStage < currentStage; curStage++) {
		roundedPeriods += periodSize[curStage];
	}

	let stageTokensSold = currentStage < totalPeriods ? totalTokensSold - roundedPeriods : periodSize[currentStage - 1];

	for(let curStage = 0; curStage < currentStage; curStage++) {
		totalUSDRaised += periodSize[curStage] * salePrices[curStage];
	}

	stageTotalUSD = periodSize[currentStage < totalPeriods ? currentStage : currentStage - 1] * salePrices[currentStage < totalPeriods ? currentStage : currentStage - 1];

	if(totalTokensSold > roundedPeriods) {
		totalUSDRaised += stageTokensSold * salePrices[currentStage < totalPeriods ? currentStage : currentStage - 1];
	}

	stageUSDRaised = stageTokensSold * salePrices[currentStage < totalPeriods ? currentStage : currentStage - 1];

	for(let curStage = 0; curStage < totalPeriods; curStage++) {
		totalUSD += periodSize[curStage] * salePrices[curStage];
		if(curStage <= currentStage) stageTotalUSDTarget += periodSize[curStage] * salePrices[curStage];
	}

	stageTotalTokensTarget = getCurrentStageLimit(periodSize, currentStage < totalPeriods ? currentStage : currentStage - 1);

	return [Math.floor(totalUSD), Math.floor(totalUSDRaised), Math.floor(stageTotalUSD), Math.floor(stageUSDRaised), Math.floor(stageTokensSold), Math.floor(stageTotalTokensTarget), Math.floor(stageTotalUSDTarget)];
}

export async function retrievePresaleInfo(contract) {
	let info = {};

	const periodSizes = await contract.getStageSizes();
	const periodPrices = await contract.getStagePrices();

	const periods = [];
	let curPeriod = 1;
	for(const period of periodSizes) {
		const curSize = parseInt(period);
		info[`periodSize${curPeriod}`] = curSize;
		periods.push(curSize);
		curPeriod++;
	}

	const prices = [];
	let curPrice = 1;
	for(const price of periodPrices) {
		const curPrc = parseFloat(weiToEther(price));
		info[`salePriceStage${curPrice}`] = curPrc;
		prices.push(curPrc);
		curPrice++;
	}

	info.tokensLeft = parseInt(await contract.inSale());
	info.minimumBuyAmount =  parseInt(await contract.minimumBuyAmount());
	info.totalTokensForPresale = parseInt(await contract.totalTokensForPresale());
	info.totalTokensSold = info.totalTokensForPresale - info.tokensLeft;

	info.currentStage = getCurrentStage(periods, info.totalTokensSold);

	info.currentPrice = info[`salePriceStage${info.currentStage + 1}`];
	info.nextPrice = info.currentStage >= (periods.length - 1) ? null : info[`salePriceStage${info.currentStage + 2}`];
	info.totalPeriods = periods.length;
	
	const [totalUSD, totalUSDraised, stageTotalUSD, stageUSDRaised, stageTokensSold, stageTotalTokensTarget, stageTotalUSDTarget] = calculateUSDValues(
		info.totalTokensSold,
		periods,
		info.currentStage,
		info.totalPeriods,
		prices
	);

	info.stagePercentsCompleted = Math.floor((totalUSDraised / stageTotalUSDTarget) * 100).toFixed(2);
	info.percentsCompleted = Math.floor(info.totalTokensSold / info.totalTokensForPresale * 100).toFixed(2);
	info.totalUSD = totalUSD;
	info.totalUSDraised = totalUSDraised;
	info.stageTokensSold = stageTokensSold;
	info.stageUSDRaised = stageUSDRaised;
	info.stageTotalTokensTarget = stageTotalTokensTarget;
	info.stageTotalUSDTarget = stageTotalUSDTarget;
	info.stageTotalUSD = stageTotalUSD;

	return info;
}

export async function retrieveAdditionalPresaleInfo(contract, data) {
	let info = {};

	info.tokensBoughtByUser = parseInt(weiToEther(await contract.userDeposits(data.wallet)))
	info.claimStart = parseInt(await contract.claimStart());
	info.startTime = parseInt(await contract.startTime());
	info.endTime = parseInt(await contract.endTime());
	info.buyBtnDisabled = false;
	info.claimBtnDisabled = true;

	const curTimestamp = getCurrentTimestamp();
	if(info.startTime > curTimestamp || curTimestamp > info.endTime || info.currentStage >= data.totalPeriods) info.buyBtnDisabled = true;
	if(info.claimStart > 0 && curTimestamp > info.claimStart && info.tokensBoughtByUser > 0) info.claimBtnDisabled = false;

	return info;
}