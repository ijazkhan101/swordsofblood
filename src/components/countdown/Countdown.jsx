import { useState, useEffect, useContext, Fragment } from 'react'
//
import styles from './countdown.module.css';
import Box from './partials/Box';
import Localization from '../../context/localization';


const Countdown = () => {

  const { strings } = useContext(Localization);
  const [countdown, setCountdown] = useState({ Days: 0, Hours: 0, Minutes: 0, Seconds: 0 });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const endDate = new Date('2023-04-08T23:00:00Z').getTime();
      const distance = endDate - now;

      if (distance < 0) {
        clearInterval(intervalId);
      } else {
        setCountdown({
          Days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          Hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          Minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          Seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.container} >
      <p> {strings.timerLabel} </p>

      <div className={styles.box_wrapper} >
        {Object.keys(countdown).map((key, i) => (
          <Fragment key={i}>
            <Box count={countdown[key]} label={strings.date[key]} />
            <div className={styles.colon} style={{ display : `${i === 3 && "none"}` }} > <span /> <span /> </div> 
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default Countdown