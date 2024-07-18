import React from "react";
import { Bar, Doughnut, Line, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
  ArcElement,
  RadialLinearScale,
} from "chart.js";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";

type Props = {
  tokenResults: any;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Filler,
  Legend
);

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

const extractPartofSpeech = (tokenResults: any) => {
  const partOfSpeechCounts: { [key: string]: number } = {};

  if (tokenResults) {
    tokenResults.forEach((token: any) => {
      if (token.partOfSpeech && token.partOfSpeech.tag) {
        const posTag = token.partOfSpeech.tag;
        if (!partOfSpeechCounts[posTag]) {
          partOfSpeechCounts[posTag] = 0;
        }
        partOfSpeechCounts[posTag]++;
      }
    });
  }

  return partOfSpeechCounts;
};

const KeywordInsights = (props: Props) => {
  const partOfSpeechCounts = extractPartofSpeech(props.tokenResults);

  const chartData = {
    labels: Object.keys(partOfSpeechCounts).map(
      (key) => partOfSpeechMapping[key] || key
    ),
    datasets: [
      {
        label: "Part of Speech Count",
        data: Object.values(partOfSpeechCounts),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",   // Color 1
          "rgba(54, 162, 235, 0.5)",   // Color 2
          "rgba(255, 206, 86, 0.5)",   // Color 3
          "rgba(75, 192, 192, 0.5)",   // Color 4
          "rgba(153, 102, 255, 0.5)",  // Color 5
          "rgba(255, 159, 64, 0.5)",   // Color 6
          "rgba(12, 163, 223, 0.5)",   // Color 7
          "rgba(255, 99, 71, 0.5)",    // Color 8
          "rgba(60, 179, 113, 0.5)",   // Color 9
          "rgba(238, 130, 238, 0.5)",  // Color 10
          "rgba(244, 164, 96, 0.5)",   // Color 11
          "rgba(0, 128, 128, 0.5)",    // Color 12
        ],
      },
    ],
  };

  const options = {
    // maintainAspectRatio: false,
  };

  return (
    <div className="flex flex-col">
      <Tabs
        placement="bottom"
        variant="bordered"
        aria-label="Tabs variants"
        className="w-full"
      >
        <Tab key="Area" title="Line">
          <div className="chart-container">
            <Line data={chartData} options={options} />
          </div>
        </Tab>
        <Tab key="Bar" title="Bar">
          <div className="chart-container">
            <Bar data={chartData} options={options} />
          </div>
        </Tab>
        <Tab key="Pie" title="Pie">
          <div className="chart-container">
            <Doughnut data={chartData} options={options} />
          </div>
        </Tab>
        <Tab key="Radar" title="Radar"> 
          <div className="chart-container">
            <Radar data={chartData} options={options} />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default KeywordInsights;
