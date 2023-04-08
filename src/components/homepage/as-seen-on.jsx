import { useContext, useEffect } from 'react';
import Swiper, { Autoplay } from 'swiper';
import Localization from "../../context/localization";
import { importAllImages } from "../../functions/common";
import styles from './as-seen-on.module.css';
import { Link } from 'react-router-dom';

export default function AsSeenOn() {
	const { strings } = useContext(Localization);
	const images = importAllImages();

	const slides = [
		{
			name: 'Forbes',
			link: 'https://www.forbes.com/sites/kenrapoza/2022/11/02/blockchain-play-to-earn-games-like-axie-infinity-have-failed-investors-now-what/?sh=6b4f58e3b533',
			img: images['home/seenon/forbes.png']
		},
		{
			name: 'Gamesbeat',
			link: 'https://venturebeat.com/games/swords-of-blood-raises-1-6m-for-hacknslash-web3-rpg/',
			img: images['home/seenon/gamesbeat.png']
		},
		{
			name: 'HackerNoon',
			link: 'https://hackernoon.com/play-to-own-is-this-game-mode-the-future-of-web3',
			img: images['home/seenon/HackerNoon.png']
		},
		{
			name: 'Medium',
			link: 'https://playtoearngames.medium.com/swords-of-blood-hack-n-slash-and-play-and-earn-in-this-superfast-aaa-blockchain-nft-game-eaf83ed6ceed',
			img: images['home/seenon/medium.png']
		},
		{
			name: 'CryptoSlate',
			link: 'https://cryptoslate.com/press-releases/swords-of-blood-opens-the-gateway-for-traditional-online-gamers-to-seamlessly-transition-into-web3-gaming/',
			img: images['home/seenon/CryptoSlate.png']
		},
		{
			name: 'Blockchaingamer',
			link: 'https://www.blockchaingamer.biz/news/20803/hitbox-games-secures-1-6m-funding-to-power-the-growth-of-its-hacknslash-title-swords-of-blood/',
			img: images['home/seenon/blockchaingamer.png']
		},
		{
			name: 'PlayToEarn',
			link: 'https://playtoearn.net/news/swords-of-blood-secures-1-6-million-in-seed-round-for-hack-slash-mmorpg',
			img: images['home/seenon/play-to-earn.png']
		},
		{
			name: 'EGamers',
			link: 'https://egamers.io/this-first-hack-n-slash-mmorpg-coming-to-polygon-swords-of-blood-raises-1-6m/',
			img: images['home/seenon/egamers-logo-header.png']
		},
		{
			name: 'Cryptonewsland',
			link: 'https://cryptonewsland.com/leaning-into-nft-how-to-make-gamers-see-nft-ownership-for-its-value/',
			img: images['home/seenon/cryptonewsland.png']
		},
		{
			name: 'uToday',
			link: 'https://u.today/swords-of-blood-pioneering-aaa-play-to-own-game-partners-with-polygon-completes-seed-funding',
			img: images['home/seenon/uToday.png']
		},
	]

	useEffect(()=>{
		let swiper = null;

		if(window.matchMedia("(max-width: 1199px)").matches) {
			swiper = new Swiper('.asSeenOnSwiper', {
				modules: [Autoplay],
				direction: "horizontal",
				loop: true,
				slidesPerView: 5,
				spaceBetween: 15,
				autoplay: {
					delay: 2000,
				},
				breakpoints: {
					767: {
						slidesPerView: 4,
					},
					400: {
						slidesPerView: 3,
					},
					320: {
						slidesPerView: 2.5,
					},
				},
			});
		}

		return () => {
			if(swiper) swiper.destroy();
		}
	},[])

	return (
		<div className={styles.asSeenOnWrapper}>
			<h1 className={[styles.heading, 'heading'].join(' ')}>{strings.asSeenOnTtl}</h1>
			
			<div className="swiper asSeenOnSwiper">
				<div className={[styles.asSeenOn, 'swiper-wrapper'].join(' ')}>
				{
					slides.map((p,i)=>{
						return (
							<div key={i} className="swiper-slide">
								<Link to={p.link} target="_blank" rel="noreferrer" className={styles.seeonImageContainer}>
									<img src={p.img} alt={p.name} className={styles.seeonImage}/>
								</Link>
							</div>
						)
					})
				}
				</div>
			</div>
		</div>
	)
}