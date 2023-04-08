import { useContext, useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Localization from "../../context/localization";
import { config } from "../../functions/config";
import mcwStyles from "../modal-connect-wallet/modal-connect-wallet.module.css";
import styles from "./modal-buy.module.css";

function format(num) {
  const result = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return result;
}
export default function ModalBuy({
  showModal,
  setShowModal,
  purchaseToken,
  presaleData,
  buyAction,
}) {
  const { strings } = useContext(Localization);
  const [selectedToken, setSelectedToken] = useState("ETH");
  const [buyAmount, setBuyAmount] = useState(3000);
  const [payAmount, setPayAmount] = useState(0);
  const curBodyClasses = useRef(null);

  const updateSelectedToken = (val) => {
    // eslint-disable-next-line default-case
    switch (val) {
      case 4:
        setSelectedToken("ETH");
        break;
      case 0:
        setSelectedToken("USDT");
        break;
      case 1:
        setSelectedToken("USDC");
        break;
      case 2:
        setSelectedToken("BUSD");
        break;
      case 3:
        setSelectedToken("DAI");
        break;
    }
  };

  const updatePayAmount = (val) => {
    setPayAmount(
      parseFloat(val * presaleData.currentPrice).toLocaleString("en-US")
    );
  };

  const updateTokenAmount = (val) => {
    val = val.replace(/[^0-9]/g, "");
    setBuyAmount(val);
  };

  useEffect(() => {
    updateSelectedToken(purchaseToken);
    updatePayAmount(buyAmount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchaseToken, buyAmount]);

  useEffect(() => {
    curBodyClasses.current = document.body.classList;
    if (Array.isArray(curBodyClasses.current))
      curBodyClasses.current = curBodyClasses.current.join(" ");
  }, []);

  const changeAmountHandler = (value) => {
    updateTokenAmount(value);
  };

  return ReactDOM.createPortal(
    <>
      {showModal && (
        <>
          <div className={mcwStyles.modalCont}>
            <div className={[mcwStyles.modal, styles.modal].join(" ")}>
              <div className={styles.modalContent}>
                <p className={mcwStyles.modalClose}>
                  <FontAwesomeIcon
                    onClick={() => setShowModal(false)}
                    icon={faXmark}
                  />
                </p>
                <p className={styles.modalTitle}>
                  {strings.buyTokenWith} {selectedToken}
                </p>
                <p className={styles.modaltagline}>{strings.buyDesc}</p>
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    value={format(buyAmount)}
                    className={styles.input}
                    onChange={(e) => updateTokenAmount(e.target.value)}
                  />
                  <p className={styles.token}>{config.tokenSymbol}</p>
                </div>
                <div className={styles.suggestionContainer}>
                  <span className={styles.suggestion}>
                    {strings.payTtl}: {payAmount} USDT
                  </span>
                  <span className={styles.suggestion}>
                    {strings.minimumTtl}: 3,000 {config.tokenSymbol}
                  </span>
                </div>
                {purchaseToken < 4 && (
                  <div
                    className={[
                      styles.suggestionContainer,
                      styles.margTop,
                    ].join(" ")}
                  >
                    <span className={styles.suggestion}>
                      {strings.approveMessage}
                    </span>
                  </div>
                )}

                <div className={styles.tokensToBuyContainer}>
                  <button onClick={() => changeAmountHandler("5000")}>
                    5,000 SWDTKN
                  </button>
                  <button onClick={() => changeAmountHandler("8000")}>
                    8,000 SWDTKN
                  </button>
                  <button onClick={() => changeAmountHandler("10000")}>
                    10,000 SWDTKN
                  </button>
                </div>

                <button
                  onClick={() => buyAction(buyAmount)}
                  className={styles.approveButton}
                >
                  {strings.buyTtl}
                </button>
              </div>
            </div>
          </div>
          <Helmet
            bodyAttributes={{
              class: [curBodyClasses.current, mcwStyles.noScroll].join(" "),
            }}
          />
        </>
      )}
    </>,
    document.getElementById("root")
  );
}
