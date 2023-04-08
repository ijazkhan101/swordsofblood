
import { Link } from 'react-router-dom';
import styles from './404.module.css';

export default function Fourzerofour() {
	return (
		<div className={styles.container} >
			<h1 className={styles.glitch} > 404	</h1>
			<h2>Page not found</h2>

			<Link to='/' >
				<span>Back to home to buy $SWDTKN</span>
			</Link>
		</div>
	)
}