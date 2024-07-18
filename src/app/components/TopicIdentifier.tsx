import { Chip } from "@nextui-org/react";
import React from "react";

type Props = {
  topicResults: any;
};

const extractTopics = (topicResults: any) => {
  const topics: { name: string; type: string; link?: string }[] = [];
  if (topicResults.entities) {
    topicResults.entities.forEach((entity: any) => {
      topics.push({
        name: entity.name,
        type: entity.type,
        link: entity.metadata?.wikipedia_url,
      });
    });
  }

  return topics;
};

const TopicIdentifier = (props: Props) => {
  const topics = extractTopics(props.topicResults);

  const categorizedTopics = topics.reduce((acc: any, topic) => {
    if (!acc[topic.type]) {
      acc[topic.type] = [];
    }
    acc[topic.type].push(topic);
    return acc;
  }, {});

  return (
    <div className="p-2 my-2">
      <text className="text-lg font-bold">Identified Topics</text>
      {Object.keys(categorizedTopics).length > 0 ? (
        Object.keys(categorizedTopics).map((type) => (
          <div key={type}>
            <text className="text-sm font-bold">{type}</text>
            <div className="flex flex-wrap my-2">
              {categorizedTopics[type].map((topic: any, index: number) =>
                topic.link ? (
                  <Chip
                    key={index}
                    className="m-1"
                    variant="dot"
                  >
                    <a
                      href={topic.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <u>{topic.name}</u>
                    </a>
                  </Chip>
                ) : (
                  <Chip key={index} className="m-1">
                    {topic.name}
                  </Chip>
                )
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No topics found.</p>
      )}
    </div>
  );
};

export default TopicIdentifier;
