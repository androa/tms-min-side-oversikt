import { useState } from "react";
import { useIntl } from "react-intl";
import { Panel, Heading, BodyShort } from "@navikt/ds-react";
import { loginserviceStepUpUrl } from "../../../api/urls";
import { SpeechBubble, FileFolder } from "@navikt/ds-icons";
import ArkiverKnapp from "../../arkiverknapp/ArkiverKnapp";
import BeskjedCSS from "./ArkiverbarBeskjed.module.css";
import useStore from "../../../store/store";
import { selectRemoveBeskjed } from "../../../store/selectors";
import { remove } from "../varsler-list/VarslerList";

const ArkiverbarBeskjed = ({ tekst, dato, isMasked, beskjed }) => {
  const [showArkiverIkon, setShowArkiverIkon] = useState(false);
  const translate = useIntl();

  const printTekst = isMasked ? translate.formatMessage({ id: "beskjed.maskert.tekst" }) : tekst;

  const handleArkiverknappMouseEnter = () => {
    setShowArkiverIkon(true);
  };

  const handleArkiverknappMouseLeave = () => {
    setShowArkiverIkon(false);
  };

  return (
    <Panel className={BeskjedCSS.beskjed}>
      <div className={BeskjedCSS.content}>
        <div className={BeskjedCSS.ikon}>{showArkiverIkon ? <FileFolder /> : <SpeechBubble />}</div>
        <div className={BeskjedCSS.tekst_wrapper}>
          <Heading spacing level="2" size="medium" className={BeskjedCSS.tekst}>
            {printTekst}
          </Heading>
          <BodyShort className={BeskjedCSS.dato}>{dato}</BodyShort>
        </div>
      </div>
      <ArkiverKnapp
        className={BeskjedCSS.knapp}
        mouseEnter={handleArkiverknappMouseEnter}
        mouseLeave={handleArkiverknappMouseLeave}
        remove={remove}
        beskjed={beskjed}
      />
    </Panel>
  );
};

export default ArkiverbarBeskjed;
