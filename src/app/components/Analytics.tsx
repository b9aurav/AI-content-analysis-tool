import React from "react";
import SentimentAnalytics from "./SentimentAnalytics";
import TopicIdentifier from "./TopicIdentifier";
import TextSummary from "./TextSummary";

interface AnalyticsProps {
  analysisResults: any;
}

const extractTopicsAndKeywords = (analysisResults: any) => {
  const topics: { name: string; type: string; link?: string }[] = [];
  const partOfSpeechCounts: { [key: string]: number } = {};

  if (analysisResults.entities) {
    analysisResults.entities.forEach((entityGroup: any) => {
      if (entityGroup && entityGroup.entities) {
        entityGroup.entities.forEach((entity: any) => {
          topics.push({
            name: entity.name,
            type: entity.type,
            link: entity.metadata?.wikipedia_url,
          });
        });
      }
    });
  }

  if (analysisResults.tokens) {
    analysisResults.tokens.forEach((token: any) => {
      if (token.partOfSpeech && token.partOfSpeech.tag) {
        const posTag = token.partOfSpeech.tag;
        if (!partOfSpeechCounts[posTag]) {
          partOfSpeechCounts[posTag] = 0;
        }
        partOfSpeechCounts[posTag]++;
      }
    });
  }

  return { topics, partOfSpeechCounts };
};

const partOfSpeechMapping: { [key: string]: string } = {
  UNKNOWN: "Unknown",
  ADJ: "Adjective",
  ADP: "Adposition",
  ADV: "Adverb",
  CONJ: "Conjunction",
  DET: "Determiner",
  NOUN: "Noun",
  NUM: "Cardinal number",
  PRON: "Pronoun",
  PRT: "Particle",
  PUNCT: "Punctuation",
  VERB: "Verb",
  X: "Other",
  AFFIX: "Affix",
};

const Analytics = ({ analysisResults }: AnalyticsProps) => {
  const { partOfSpeechCounts } =
    extractTopicsAndKeywords(analysisResults);

  const chartData = {
    labels: Object.keys(partOfSpeechCounts).map(
      (key) => partOfSpeechMapping[key] || key
    ),
    datasets: [
      {
        label: "Part of Speech Count",
        data: Object.values(partOfSpeechCounts),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div className="m-4">
      {analysisResults && (
        <div>
          <SentimentAnalytics sentimentResult={analysisResults.sentimentResult} />
          <TextSummary summaryData={analysisResults.summaryResult[0]} />
          <TopicIdentifier topicResults={analysisResults.entities[0]} />
        </div>
      )}
    </div>
  );
};

export default Analytics;
