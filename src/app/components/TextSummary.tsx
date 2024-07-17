import { Textarea } from "@nextui-org/react";
import React from "react";

type Props = {
  summaryData: any;
};

const TextSummary = (props: Props) => {
  const summarizedText = props.summaryData.tokens
    .map((item: any) => item.text.content.trim())
    .join(" ");
  return <div className="p-2 mt-2">
    <text className="text-lg font-bold">Summarized Text</text>
    <Textarea maxRows={25} className="w-full mt-2" value={summarizedText} isReadOnly />
  </div>;
};

export default TextSummary;
