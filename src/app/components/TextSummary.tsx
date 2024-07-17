import React from "react";

type Props = {
  summaryData: any;
};

const TextSummary = (props: Props) => {
    console.log(props.summaryData);
  const summarizedText = props.summaryData.tokens
    .map((item: any) => item.text.content.trim())
    .join(" ");
  return <div className="card p-4 mt-2">
    <text className="text-lg font-bold">Summarized Text</text>
    <textarea rows={12} className="w-full mt-2" value={summarizedText} readOnly />
  </div>;
};

export default TextSummary;
