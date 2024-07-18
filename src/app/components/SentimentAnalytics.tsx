import {
  Badge,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Filler,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";

type Props = {
  sentimentResult: any;
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
  ChartTooltip,
  Filler,
  Legend
);

const getSentimentEmoji = (score: number) => {
  if (score > 0.75) return "😃";
  if (score > 0.25) return "🙂";
  if (score > -0.25) return "😐";
  if (score > -0.75) return "😟";
  return "😠";
};

const SentimentAnalytics = (props: Props) => {
  const score = Number(props.sentimentResult.documentSentiment.score);
  const magnitude = Number(props.sentimentResult.documentSentiment.magnitude);

  const sentences = props.sentimentResult.sentences;
  const labels = sentences.map((sentence: any) => sentence.text.content);
  const data = sentences.map((sentence: any) => sentence.sentiment.score);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Sentence Sentiment Score",
        data: data,
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        fill: "origin",
      },
    ],
  };

  const chartOptions = {
    // maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
      },
    },
  };

  return (
    <div className="p-2 mt-2">
      <div className="flex justify-center items-center flex-col">
        <strong>Sentiment Analysis:</strong>
        <br />
        <span className="text-6xl">
          <Badge content={score.toFixed(2)}>
            {getSentimentEmoji(props.sentimentResult.documentSentiment.score)}
          </Badge>
        </span>
        <div className="flex items-center">
          <p>
            <strong>Score:</strong> {score.toFixed(2)}
          </p>
          <Popover placement="right">
            <PopoverTrigger>
              <Button size="sm" radius="full" className="mx-2" isIconOnly>
                <strong>?</strong>
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2">
                <div className="text-small font-bold">Score</div>
                <div className="text-tiny mt-1">
                  <ul>
                    <li>The score typically ranges from -1.0 to 1.0.</li>
                    <li>A score closer to 1.0 indicates positive sentiment.</li>
                    <li>
                      A score closer to -1.0 indicates negative sentiment.
                    </li>
                    <li>A score around 0 indicates neutral sentiment.</li>
                  </ul>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center">
          <p>
            <strong>Magnitude:</strong> {magnitude.toFixed(2)}
          </p>
          <Popover placement="right">
            <PopoverTrigger>
              <Button size="sm" radius="full" className="mx-2" isIconOnly>
                <strong>?</strong>
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2">
                <div className="text-small font-bold">Magnitude</div>
                <div className="text-tiny mt-1">
                  <ul>
                    <li>
                      The magnitude measures the overall strength of the
                      sentiment, regardless of whether it is positive or
                      negative.
                    </li>
                    <li>
                      It is a non-negative number that represents the absolute
                      sentiment strength.
                    </li>
                    <li>
                      A score closer to -1.0 indicates negative sentiment.
                    </li>
                    <li>
                      Higher magnitude values indicate stronger sentiment
                      (either positive or negative).
                    </li>
                  </ul>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="chart-container flex justify-center items-center w-full h-full">
        <Line data={chartData} options={chartOptions} className="mt-4" />
      </div>
      <div className="flex justify-center items-center">
        <text>Hover over points to check sentences.</text>
      </div>
    </div>
  );
};

export default SentimentAnalytics;
