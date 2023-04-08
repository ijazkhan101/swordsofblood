import { useContext } from 'react';
import Localization from "../../context/localization";
import { importAllImages } from "../../functions/common";
import styles from './roadmap.module.css';

export default function Roadmap() {
	const { strings } = useContext(Localization);
	const images = importAllImages();

	return (
		<>
			<h1 className={['heading', styles.roadMapHeading].join(' ')}>{strings.rmTtl}</h1>
			<img src={images['roadmap-en.webp']} alt="#" className="image" />
		</>
	)
}