import en from "./en";
import de from "./de";
import fr from "./fr";
import ch from "./ch";
import ko from "./ko";
import sp from "./sp";
import jp from "./jp";
import ind from "./in";
import po from "./ma";
import ma from "./po";
import it from "./it";
import tur from "./tur";
import tai from "./tai";
import ru from "./ru";

const strings = { en, ru, tur, tai, de, fr, sp, ko, ch, jp, ind, po, ma, it };
export function GetLocale(lang, appName) {
  if (strings[lang] === undefined) return strings.en(appName);
  return [Object.keys(strings), strings[lang](appName)];
}
