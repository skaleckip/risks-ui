// noinspection JSUnusedGlobalSymbols
import type { Route } from "./+types/risks-criteria";
import React, { useState } from "react";
import classNames from "classnames";
import { ProbabilityClassList } from "~/components/probability-class-list";
import { ImpactClassList } from "~/components/impact-class-list";
import { RiskLevelList } from "~/components/risk-level-list";
import type { ImpactClassDto, ProbabilityClassDto, RiskLevelDto } from "~/api/system-versions";
import { RiskAreaList } from "~/components/risk-area-list";
import useAxios from "axios-hooks";

// noinspection JSUnusedGlobalSymbols
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Norman - Identify risks" },
    { name: "description", content: "Risk assessment criteria" },
  ];
}

export default function RisksCriteria({ params }: Route.ComponentProps): React.ReactElement {
  const [tabIndex, setTabIndex] = useState(0)
  const tabCnAre = classNames({ 'tab': true, 'tab-active': tabIndex === 0 })
  const tabCnPro = classNames({ 'tab': true, 'tab-active': tabIndex === 1 })
  const tabCnImp = classNames({ 'tab': true, 'tab-active': tabIndex === 2 })
  const tabCnEvl = classNames({ 'tab': true, 'tab-active': tabIndex === 3 })

  return (
    <>
      <div role="tablist" className="tabs tabs-lift">
        <a role="tab" className={tabCnAre} onClick={() => setTabIndex(0)}>Risk areas</a>
        <a role="tab" className={tabCnPro} onClick={() => setTabIndex(1)}>Probability classes</a>
        <a role="tab" className={tabCnImp} onClick={() => setTabIndex(2)}>Impact classes</a>
        <a role="tab" className={tabCnEvl} onClick={() => setTabIndex(3)}>Risk levels</a>
      </div>

      {tabIndex === 0 ? <RiskAreas systemVersionId={params.systemVersionId} /> : <></>}
      {tabIndex === 1 ? <ProbabilityClasses systemVersionId={params.systemVersionId} /> : <></>}
      {tabIndex === 2 ? <ImpactClasses systemVersionId={params.systemVersionId} /> : <></>}
      {tabIndex === 3 ? <RiskLevels systemVersionId={params.systemVersionId} /> : <></>}
    </>
  )
}

interface ProbabilityClassesProps {
  systemVersionId: string;
}

function ProbabilityClasses({ systemVersionId }: ProbabilityClassesProps): React.ReactElement {
  const url = encodeURI(`/system-versions/${systemVersionId}/probability-classes`);
  // No loading, to avoid flickering on tab switching
  const [{ data, error }] = useAxios<ProbabilityClassDto[]>(url);

  if (error) {
    return (<p>Failed to read data, check your browsers console!</p>)
  }

  return (
    <ProbabilityClassList classes={data ?? []} />
  )
}

interface RiskAreasProps {
  systemVersionId: string;
}

function RiskAreas({ systemVersionId }: RiskAreasProps): React.ReactElement {
  const url = encodeURI(`/system-versions/${systemVersionId}/risk-areas`);
  const [{ data, error }] = useAxios<ImpactClassDto[]>(url);

  // No loading, to avoid flickering on tab switching

  if (error) {
    return (<p>Failed to read data, check your browsers console!</p>)
  }

  return (
    <RiskAreaList areas={data ?? []} />
  )
}

interface ImpactClassesProps {
  systemVersionId: string;
}

function ImpactClasses({ systemVersionId }: ImpactClassesProps): React.ReactElement {
  const url = encodeURI(`/system-versions/${systemVersionId}/impact-classes`);
  const [{ data, error }] = useAxios<ImpactClassDto[]>(url);

  // No loading, to avoid flickering on tab switching

  if (error) {
    return (<p>Failed to read data, check your browsers console!</p>)
  }

  return (
    <ImpactClassList classes={data ?? []} />
  )
}

interface RiskLevelsProps {
  systemVersionId: string;
}

function RiskLevels({ systemVersionId }: RiskLevelsProps): React.ReactElement {
  const url = encodeURI(`/system-versions/${systemVersionId}/risk-levels`);
  // No loading, to avoid flickering on tab switching
  const [{ data, error }] = useAxios<RiskLevelDto[]>(url);

  if (error) {
    return (<p>Failed to read data, check your browsers console!</p>)
  }

  return (
    <RiskLevelList levels={data ?? []} />
  )
}