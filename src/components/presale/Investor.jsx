import { useContext } from 'react';
import Localization from "../../context/localization";
import { importAllImages } from "../../functions/common";
import styles from './investors.module.css';

export default function Investors() {
    const { strings } = useContext(Localization);
    const images = importAllImages();

    const backers = [
        {
            img: images['home/partner/backers/forbes.webp'],
            link: 'http://www.asteroidlabs.io/'
        },
        {
            img: images['home/partner/backers/forbes-5.webp'],
            link: 'https://masterventures.com/'
        },
        {
            img: images['home/partner/backers/forbes-2.webp'],
            link: 'https://www.shugo.ventures/'
        },
        {
            img: images['home/partner/backers/forbes-4.webp'],
            link: 'https://magnuscapital.com/'
        },
        {
            img: images['home/partner/backers/forbes-9.webp'],
            link: 'https://www.gate.io/'
        },
        {
            img: images['home/partner/backers/forbes-1.webp'],
            link: 'https://metavest.capital'
        },
        {
            img: images['home/partner/backers/forbes-6.webp'],
            link: 'https://kangaroocapital.io/'
        },
        {
            img: images['home/partner/backers/forbes-3.webp'],
            link: 'https://cth.group/what_we_do/fundamental_labs/'
        },
        {
            img: images['home/partner/backers/forbes-8.webp'],
            link: 'https://krypital.com/en'
        },
    ]

    return (
        <div className={styles.ourParners}>
            <h1 className={[styles.heading, 'heading'].join(' ')}>{strings.investorTtl}</h1>

            <div className={styles.partnerWrapper}>
                <div className={styles.partners}>
                    {
                        backers.map((p, i) => {
                            return (
                                <a key={i} href={p.link} target="_blank" rel="noreferrer" className={styles.partnerImageContainer}>
                                    <img src={p.img} alt="#" className={styles.partnerImage} />
                                </a>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}