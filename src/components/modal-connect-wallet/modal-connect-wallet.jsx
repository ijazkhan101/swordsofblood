import { useContext, useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import ReactDOM from "react-dom";
import Localization from "../../context/localization";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { SetGlobalProvider } from "../../functions/onchain";
import { config } from "../../functions/config";
import { importAllImages } from "../../functions/common";
import styles from "./modal-connect-wallet.module.css";
import Web3Provider from "../../context/web3provider"

export default function ModalConnectWallet({
  showModal,
  setShowModal,
  afterConnect,
}) {
  const { strings } = useContext(Localization);
  const web3provider = useContext(Web3Provider);
  const [inProcess, setInProcess] = useState(false);
  const curBodyClasses = useRef(null);
  const images = importAllImages();

  async function InitiateProvider(type) {
    let inProcess = false;
    if (type <= 0) inProcess = true;

    if (inProcess) setInProcess(true);

    const [status, message] = await SetGlobalProvider(type, web3provider);
    if (!status) {
      if (inProcess) setInProcess(false);
      if (message)
        alert(
          message.replace(
            "{NETWORK}",
            config[web3provider.current.network].chainName
          )
        );
      return;
    }

    if (inProcess) setInProcess(false);
    setShowModal(false);
    await afterConnect();
  }

  useEffect(() => {
    curBodyClasses.current = document.body.classList;
    if (Array.isArray(curBodyClasses.current))
      curBodyClasses.current = curBodyClasses.current.join(" ");
  }, []);

  return ReactDOM.createPortal(
    <>
      {showModal && (
        <>
          <div className={styles.modalCont}>
            <div className={styles.modal}>
              <div
                className={[
                  styles.modalWrapper,
                  inProcess ? styles.loading : "",
                ].join(" ")}
              >
                {!inProcess && (
                  <>
                    <p className={styles.modalClose}>
                      <FontAwesomeIcon
                        onClick={() => setShowModal(false)}
                        icon={faXmark}
                      />
                    </p>
                    <img
                      src={images["home/presale.webp"]}
                      alt="#"
                      className={styles.modalPresaleIcon}
                    />
                    <p className={styles.modalText}>
                      {strings.connectTheWallet}
                    </p>
                    <div className={styles.buttonContainer}>
                      <button
                        onClick={() => InitiateProvider(0)}
                        className={styles.modalConnectButton}
                      >
                        <img
                          src={images["presale/metamask.webp"]}
                          alt="#"
                          className={styles.icon}
                        />
                      </button>
                      <button
                        onClick={() => InitiateProvider(1)}
                        className={styles.modalConnectButton}
                      >
                        <img
                          src={images["presale/walletConnect.webp"]}
                          alt="#"
                          className={styles.icon}
                        />
                      </button>
                    </div>
                    <p className={styles.modalInfo}>{strings.connectNote}</p>
                  </>
                )}
              </div>
            </div>
          </div>
          <Helmet
            bodyAttributes={{
              class: [curBodyClasses.current, styles.noScroll].join(" "),
            }}
          />
        </>
      )}
    </>,
    document.getElementById("root")
  );
}
