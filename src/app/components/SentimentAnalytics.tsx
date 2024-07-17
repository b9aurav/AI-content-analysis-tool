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
  const score = Number(
    props.sentimentResult[0].documentSentiment.score
  );
  const magnitude = Number(
    props.sentimentResult[0].documentSentiment.magnitude
  );
  return (
    <div className="card p-4">
      <h2>Sentiment Analysis</h2>
      <div className="flex">
        <div className="w-1/2">
          <p>
            <strong>Sentiment:</strong>
            <br />
            <span className="text-4xl">
              {getSentimentEmoji(
                props.sentimentResult[0].documentSentiment.score
              )}
            </span>
          </p>
        </div>
        <div className="w-1/2">
          <p>
            <strong>Score:</strong> {score.toFixed(2)}
          </p>
          <p>
            <strong>Magnitude:</strong> {magnitude.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalytics;
