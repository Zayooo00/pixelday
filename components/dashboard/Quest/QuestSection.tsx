import { useState, useEffect, useMemo } from "react";

import SectionHeader from "@/components/common/SectionHeader";

import PreviewQuestModal from "./PreviewQuestModal";
import { QuestPlaceholder } from "./PlaceholderQuest";
import Quest from "./Quest";

import { TUserInfo } from "@/types/users";
import { TQuest } from "@/types/quests";
import { getUserQuests } from "@/services/quests";
import { useQuests } from "@/context/QuestsContext";

type QuestGroup = {
  heading: string;
  quests: TQuest[];
};

function groupQuests(quests: TQuest[]): QuestGroup[] {
  const main: TQuest[] = [];
  const recurring: TQuest[] = [];
  const complete: TQuest[] = [];

  for (const quest of quests) {
    if (quest.status === "complete") {
      complete.push(quest);
    } else if (quest.type === "main") {
      main.push(quest);
    } else if (quest.type === "recurring") {
      recurring.push(quest);
    }
  }

  return [
    { heading: "Main Quests", quests: main },
    { heading: "Daily Quests", quests: recurring },
    { heading: "Complete Quests", quests: complete },
  ].filter((group) => group.quests.length > 0);
}

function QuestLoadingState() {
  return (
    <>
      {[2, 1, 2].map((count, sectionIndex) => (
        <div key={sectionIndex}>
          <div className="mb-5 mt-2 h-5 w-32 animate-pulse bg-gray-300" />
          {Array.from({ length: count }).map((_, index) => (
            <div key={index} className="mb-4">
              <QuestPlaceholder />
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default function QuestSection({
  currentUser,
}: {
  currentUser: TUserInfo;
}) {
  const [selectedQuest, setSelectedQuest] = useState<TQuest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPreviewQuestModalOpen, setIsPreviewQuestModalOpen] = useState(false);
  const { quests, setQuests } = useQuests();

  useEffect(() => {
    const fetchQuests = async () => {
      if (!currentUser.uid) {
        return;
      }
      setIsLoading(true);
      const fetched = await getUserQuests(currentUser.uid);
      setQuests(fetched as TQuest[]);
      setIsLoading(false);
    };

    fetchQuests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.uid]);

  const groups = useMemo(() => groupQuests(quests), [quests]);

  const handleQuestUpdate = (updatedQuest: TQuest) => {
    setSelectedQuest(updatedQuest);
    setQuests((prev) =>
      prev.map((quest) =>
        quest.questId === updatedQuest.questId ? updatedQuest : quest,
      ),
    );
  };

  const handleQuestClick = (quest: TQuest) => {
    setSelectedQuest(quest);
    setIsPreviewQuestModalOpen(true);
  };

  return (
    <>
      <SectionHeader title="Quests" />
      <div className="h-full overflow-y-auto overflow-x-hidden border-[10px] border-red-900 bg-amber-50 p-2 px-6 lg:h-[659px]">
        {isLoading ? (
          <QuestLoadingState />
        ) : (
          groups.map((group, groupIndex) => (
            <div key={group.heading}>
              <h1
                className={`mb-2 text-2xl text-red-900 ${
                  groupIndex > 0 ? "mt-4" : ""
                }`}
              >
                {group.heading}
              </h1>
              {group.quests.map((quest) => (
                <div
                  key={quest.questId}
                  onClick={() => handleQuestClick(quest)}
                >
                  <Quest
                    title={quest.title}
                    type={quest.type}
                    status={quest.status}
                  />
                </div>
              ))}
            </div>
          ))
        )}
      </div>
      {isPreviewQuestModalOpen && (
        <PreviewQuestModal
          isOpen={isPreviewQuestModalOpen}
          onClose={() => setIsPreviewQuestModalOpen(false)}
          selectedQuest={selectedQuest}
          onQuestUpdate={handleQuestUpdate}
        />
      )}
    </>
  );
}
