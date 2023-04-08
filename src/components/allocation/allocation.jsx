import { useContext } from 'react';
import Localization from "../../context/localization";
import { importAllImages } from "../../functions/common";
import styles from './allocation.module.css';

export default function Allocation() {
	const { strings } = useContext(Localization);
	const images = importAllImages();

	return (
		<>
		<h1 className={['heading', styles.tokenAllocationHeading].join(' ')}>{strings.allocTtl}</h1>
		<img src={images['ALLOCATION.webp']} alt="Token Allocation" className="image" />
		</>
	)
}