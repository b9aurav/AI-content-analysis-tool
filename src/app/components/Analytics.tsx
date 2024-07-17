import React, { useState } from "react";
import SentimentAnalytics from "./SentimentAnalytics";
import TopicIdentifier from "./TopicIdentifier";
import TextSummary from "./TextSummary";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

interface AnalyticsProps {
  analysisResults: any;
}

const Analytics = ({ analysisResults }: AnalyticsProps) => {
  return (
    <div className="m-4">
      {analysisResults && (
        <div className="flex w-full flex-col">
          <Tabs size="lg" aria-label="Options">
            <Tab key="Sentiment" title="Sentiment">
              <Card>
                <CardBody>
                  <SentimentAnalytics
                    sentimentResult={analysisResults.sentimentResult}
                  />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="Summary" title="Summary">
              <Card>
                <CardBody>
                  <TextSummary summaryData={analysisResults.summaryResult[0]} />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="Topics" title="Topics">
              <Card>
                <CardBody>
                  <TopicIdentifier topicResults={analysisResults.entities[0]} />
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default Analytics;
