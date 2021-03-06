import React from "react";
import { Core } from "../Core";
import { RankedPoliticianList, MainLayout, RankedParties } from "../Components";
import { Watch } from "../Helpers";
import { Tabs } from "antd";

export function RankingPage() {
  return (
    <MainLayout title={"Rezultatai"}>
      <div style={{ position: "absolute", right: 0, top: "5px", zIndex: 400 }}>
        <button onClick={() => {
          console.log("Reset")
          Core.Events.resetQuiz()
          Core.Navigator.pushPage({
            page: 'LegislationQuizPage',
            payload: {}
          })
        }} className={"btn btn-success btn-sm"}>Kartoti</button>
      </div>
      <Watch
        data={Core.DataPoints.politicalPartiesWithPoliticians()}
        fallback={<h1>Loading</h1>}
      >
        {({ parties, politicians }) => (
          <Tabs size={"large"} defaultActiveKey="1">
            <Tabs.TabPane tab="Partijos" key="1">
              <RankedParties
                parties={parties}
                onClick={(q) => {
                  Core.Navigator.pushPage({
                    page: "RankedPoliticians",
                    payload: {
                      party: q,
                    },
                  });
                }}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Politikai" key="2">
              <RankedPoliticianList
                politicians={politicians.politicianScores}
                onClick={(q) => {
                  Core.Navigator.pushPage({
                    page: "PoliticianSummaryPage",
                    payload: {
                      politician: q,
                    },
                  });
                }}
              />
            </Tabs.TabPane>
          </Tabs>
        )}
      </Watch>
    </MainLayout>
  );
}

export function RankedPoliticians(
  props: Core.Navigator.RouteDefinitions["RankedPoliticians"]
) {
  return (
    <MainLayout
      title={props.party.politicalPartyName}
      onBack={() => {
        Core.Navigator.popPage();
      }}
    >
      <RankedPoliticianList
        politicians={props.party.politicians}
        onClick={(q) => {
          Core.Navigator.pushPage({
            page: "PoliticianSummaryPage",
            payload: {
              politician: q,
            },
          });
        }}
      />
    </MainLayout>
  );
}
