import {
  Badge,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import React from "react";

type Props = {
  sentimentResult: any;
};

const getSentimentEmoji = (score: number) => {
  if (score > 0.75) return "😃";
  if (score > 0.25) return "🙂";
  if (score > -0.25) return "😐";
  if (score > -0.75) return "😟";
  return "😠";
};

const SentimentAnalytics = (props: Props) => {
  const score = Number(props.sentimentResult[0].documentSentiment.score);
  const magnitude = Number(
    props.sentimentResult[0].documentSentiment.magnitude
  );
  return (
    <div className="p-2 mt-2">
      <div className="flex justify-center items-center flex-col">
        <strong>Sentiment Analysis:</strong>
        <br />
        <span className="text-6xl">
          <Badge content={score.toFixed(2)}>
            {getSentimentEmoji(
              props.sentimentResult[0].documentSentiment.score
            )}
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
                    <li>The magnitude measures the overall strength of the sentiment, regardless of whether it is positive or negative.</li>
                    <li>It is a non-negative number that represents the absolute sentiment strength.</li>
                    <li>
                      A score closer to -1.0 indicates negative sentiment.
                    </li>
                    <li>Higher magnitude values indicate stronger sentiment (either positive or negative).</li>
                  </ul>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalytics;
