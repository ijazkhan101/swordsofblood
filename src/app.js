import { useRef, useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  SetGlobalProvider,
  setNetwork,
  defaultNetwork,
} from "./functions/onchain";
import {
  SetStorageData,
  GetStorageData,
  RemoveStorageData,
} from "./functions/common";
import { GetLocale } from "./lang/_langs";
import { config } from "./functions/config";
import Web3Provider from "./context/web3provider";
import Localization from "./context/localization";
import MainContainer from "./components/main-container/main-container";
import Presale from "./components/presale/presale";
import Roadmap from "./components/roadmap/roadmap";
import Privacy from "./components/privacy/privacy";
import TermsAndConditions from "./components/terms/terms";
import Allocation from "./components/allocation/allocation";
import Team from './components/team'
import "./css/global.css";
import "./css/global.responsive.css";
import "swiper/css";
import "swiper/css/pagination";

const Homepage = lazy(() => import("./components/homepage/homepage"));
const Fourzerofour = lazy(() => import("./components/404/404"));
const curLang = GetStorageData("lang");
export default function App() {
  const [lang, setLang] = useState(curLang ? curLang : config.defaultLanguage);
  const [[locales, strings], setStrings] = useState(
    GetLocale(lang, config.appName)
  );
  const web3provider = useRef({
    status: false,
    instance: null,
    network: setNetwork(defaultNetwork()),
  });

  function SetLanguage(lng) {
    SetStorageData("lang", lng);
    setLang(lng);
    setStrings(GetLocale(lng, config.appName));
  }

  useEffect(() => {
    async function restoreLastProvider() {
      const storageName = "lastProvider";
      let lastProvider = GetStorageData(storageName);
      if (lastProvider !== null && JSON.parse(lastProvider)) {
        lastProvider = JSON.parse(lastProvider);

        if (Math.ceil(Date.now() / 1000) > lastProvider.upts) {
          RemoveStorageData(storageName);
          RemoveStorageData("walletconnect");
        } else {
          web3provider.current.network = setNetwork(lastProvider.network);
          await SetGlobalProvider(lastProvider.type, web3provider);
        }
      }
    }
    restoreLastProvider();
  }, []);

  return (
    <Web3Provider.Provider value={web3provider}>
      <Localization.Provider value={{ strings, lang, locales, SetLanguage }}>
        <MainContainer>
          <Routes>
            <Route
              index
              path="/"
              element={
                <Suspense fallback={<div>...</div>}>
                  <Homepage />
                </Suspense>
              }
            />
            <Route path="/presale/" element={<Presale />} />
            <Route path="/allocation/" element={<Allocation />} />
            <Route path="/roadmap/" element={<Roadmap />} />
            <Route path="/privacy/" element={<Privacy />} />
            <Route path="/team/" element={<Team />} />
            <Route
              path="/termsandconditions/"
              element={<TermsAndConditions />}
            />
            <Route
              path="/404/"
              element={
                <Suspense fallback={<div>...</div>}>
                  <Fourzerofour />
                </Suspense>
              }
            />
            <Route path="*" element={<Navigate to="/404/" replace />} />
          </Routes>
        </MainContainer>
      </Localization.Provider>
    </Web3Provider.Provider>
  );
}
