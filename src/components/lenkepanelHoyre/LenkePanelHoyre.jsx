import React from "react";
import { useQuery } from "react-query";
import { useIntl } from "react-intl";
import { fetcher } from "../../api/api";
import { Link, Panel, Heading, Detail } from "@navikt/ds-react";
import { Dialog, Email, Folder } from "@navikt/ds-icons";
import { oppfolgingUrl } from "../../api/urls";
import "./LenkePanelHoyre.css";

const LenkePanelHoyre = () => {
  const { data: oppfolging } = useQuery(oppfolgingUrl, fetcher);
  const translate = useIntl();

  const brukerUnderOppfolging = oppfolging?.erBrukerUnderOppfolging;
  return (
    <section className="lenkepanel-hoyre-content">
      <Heading spacing level="2" size="small" className="tittel">
        {translate.formatMessage({ id: "lenkepanel.hoyre.tittel" })}
      </Heading>
      <Link>
        <Email />
        {translate.formatMessage({ id: "lenkepanel.hoyre.lenketekst.innboks" })}
      </Link>
      <Detail spacing className="ingress">
        {translate.formatMessage({ id: "lenkepanel.hoyre.ingress.innboks" })}
      </Detail>
      {brukerUnderOppfolging ? (
        <>
          <Link>
            <Dialog />
            {translate.formatMessage({ id: "lenkepanel.hoyre.lenketekst.dialog" })}
          </Link>
          <Detail spacing className="ingress">
            {translate.formatMessage({ id: "lenkepanel.hoyre.ingress.dialog" })}
          </Detail>
        </>
      ) : null}
      <Link>
        <Folder />
        {translate.formatMessage({ id: "lenkepanel.hoyre.lenketekst.brevogvedtak" })}
      </Link>
      <Detail spacing className="ingress">
        {translate.formatMessage({ id: "lenkepanel.hoyre.ingress.brevogvedtak" })}
      </Detail>
    </section>
  );
};

export default LenkePanelHoyre;
