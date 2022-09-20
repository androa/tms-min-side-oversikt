import { useQuery } from "react-query";
import { fetcher } from "../../api/api";
import { useIntl } from "react-intl";
import { meldekortinfoApiUrl, meldekortUrl } from "../../api/urls";
import i18n from "../../language/i18n";
import Beskjed from "../varsler/beskjed/Beskjed";
import Oppgave from "../varsler/oppgave/Oppgave";

const Meldekort = () => {
  const { data: meldekort, isLoading } = useQuery(meldekortinfoApiUrl, fetcher);
  const translate = useIntl();
  const { formatDateMonth, formatDayAndMonth, numberToWord } = i18n[translate.locale];

  if (isLoading) {
    return null;
  }

  const isMeldekortBruker = meldekort?.meldekortbruker;
  const isPendingForInnsending = isMeldekortBruker && meldekort?.nyeMeldekort?.nesteInnsendingAvMeldekort;
  const isReadyForInnsending = isMeldekortBruker && meldekort?.nyeMeldekort?.antallNyeMeldekort > 0;

  const fremtidig = meldekort?.nyeMeldekort?.nesteInnsendingAvMeldekort
    ? translate.formatMessage(
        { id: "meldekort.melding.fremtidig" },
        { dato: formatDateMonth(meldekort?.nyeMeldekort?.nesteInnsendingAvMeldekort) }
      )
    : "";

  const melding = meldekort?.nyeMeldekort?.nesteMeldekort
    ? translate.formatMessage(
        {
          id: meldekort?.nyeMeldekort?.antallNyeMeldekort === 1 ? "meldekort.ett" : "meldekort.flere",
        },
        {
          count: numberToWord(meldekort?.nyeMeldekort?.antallNyeMeldekort),
          next: meldekort.nyeMeldekort.nesteMeldekort.uke,
          from: formatDayAndMonth(meldekort?.nyeMeldekort?.nesteMeldekort?.fra),
          until: formatDayAndMonth(meldekort?.nyeMeldekort?.nesteMeldekort?.til),
        }
      )
    : "";

  const trekk = !meldekort?.nyeMeldekort?.nesteMeldekort?.risikererTrekk
    ? translate.formatMessage(
        { id: "meldekort.info.om.trekk" },
        { dato: formatDateMonth(meldekort?.nyeMeldekort?.nesteMeldekort?.sisteDatoForTrekk) }
      )
    : "";

  const advarsel = meldekort?.nyeMeldekort?.nesteMeldekort?.risikererTrekk
    ? translate.formatMessage({ id: "meldekort.trekk" })
    : "";

  const overskrift = isReadyForInnsending ? fremtidig + melding + trekk + advarsel : fremtidig + advarsel;

  const feriedager =
    meldekort?.resterendeFeriedager > 0
      ? translate.formatMessage({ id: "meldekort.feriedager" }, { feriedager: meldekort?.resterendeFeriedager }) +
        translate.formatMessage({
          id: meldekort?.nyeMeldekort?.antallNyeMeldekort > 1 ? "meldekort.se.oversikt" : "meldekort.send",
        })
      : "";

  // dato property = dato på andre meldinger, men for meldekort skal dato byttes ut med en tekst angående feriedager

  if (isPendingForInnsending) {
    return (
      <li key={"meldekort-varsel"}>
        <Beskjed tekst={overskrift} dato={feriedager} href={meldekortUrl} id="meldekort-notifikasjon" />
      </li>
    );
  }

  if (isReadyForInnsending) {
    return (
      <li key={"meldekort-varsel"}>
        <Oppgave tekst={overskrift} dato={feriedager} href={meldekortUrl} id="meldekort-notifikasjon" />
      </li>
    );
  }

  return null;
};

export default Meldekort;
