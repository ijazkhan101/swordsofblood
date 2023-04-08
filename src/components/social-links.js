import { importAllImages } from "../functions/common";
const images = importAllImages();

const socialLinks = [
	{
		link: 'https://discord.com/invite/swordsofblood',
		img: images['socialmediaIcons/discord.png']
	},
	{
		link: 'https://t.me/SwordsofBlood_game',
		img: images['socialmediaIcons/telegram.png']
	},
	{
		link: 'https://www.youtube.com/c/SwordsofBlood',
		img: images['socialmediaIcons/youtube.png']
	},
	{
		link: 'https://www.twitch.tv/swordsofblood',
		img: images['socialmediaIcons/twitch.png']
	},
	{
		link: 'https://twitter.com/SwordsofBlood_',
		img: images['socialmediaIcons/twitter.png']
	},
	{
		link: 'https://www.facebook.com/SwordsOfBlood/',
		img: images['socialmediaIcons/facebook.png']
	},
	{
		link: 'https://www.instagram.com/SwordsOfBlood_/',
		img: images['socialmediaIcons/instagram.png']
	},
	{
		link: 'https://swordsofblood.medium.com/',
		img: images['socialmediaIcons/medium.png']
	},
]

export { socialLinks };