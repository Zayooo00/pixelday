import { useState, useEffect } from "react";
import { GiJusticeStar } from "react-icons/gi";

import PreviewQuestModal from "./PreviewQuestModal";
import { QuestPlaceholder } from "./PlaceholderQuest";
import Quest from "./Quest";

import { TUserInfo } from "@/types/users";
import { TQuest } from "@/types/quests";
import { getUserQuests } from "@/services/quests";
import { useQuests } from "@/context/QuestsContext";

export default function QuestSection({
  currentUser,
}: {
  currentUser: TUserInfo;
}) {
  const [selectedQuest, setSelectedQuest] = useState<TQuest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPreviewQuestModalOpen, setIsPreviewQuestModalOpen] = useState(false);
  const { quests, setQuests } = useQuests();

  const handleQuestUpdate = (updatedQuest: TQuest) => {
    setSelectedQuest(updatedQuest);

    setQuests((prevQuests) =>
      prevQuests.map((quest) =>
        quest.questId === updatedQuest.questId ? updatedQuest : quest,
      ),
    );
  };

  const handleQuestClick = (quest: TQuest) => {
    setSelectedQuest(quest);
    setIsPreviewQuestModalOpen(true);
  };

  useEffect(() => {
    const fetchQuests = async () => {
      setIsLoading(true);
      if (currentUser) {
        const quests = await getUserQuests(currentUser.uid);
        setQuests(quests as TQuest[]);
        setIsLoading(false);
      }
    };

    fetchQuests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <>
      <div className="flex items-center border-x-[10px] border-t-[10px] border-red-900 bg-amber-50 p-2">
        <GiJusticeStar className="mr-2 border-2 border-red-900 bg-white text-3xl text-red-900" />
        <h1 className="w-full border-2 border-red-900 bg-white pl-2 text-xl text-red-900">
          Quests
        </h1>
      </div>
      <div className="h-full overflow-y-auto overflow-x-hidden border-[10px] border-red-900 bg-amber-50 p-2 px-6 lg:h-[656px]">
        {isLoading ? (
          <>
            <div className="mb-5 mt-2 h-5 w-32 animate-pulse bg-gray-300" />
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="mb-4">
                <QuestPlaceholder />
              </div>
            ))}
            <div className="mb-5 mt-2 h-5 w-32 animate-pulse bg-gray-300" />
            {Array.from({ length: 1 }).map((_, index) => (
              <div key={index} className="mb-4">
                <QuestPlaceholder />
              </div>
            ))}
            <div className="mb-5 mt-2 h-5 w-32 animate-pulse bg-gray-300" />
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="mb-4">
                <QuestPlaceholder />
              </div>
            ))}
          </>
        ) : (
          <>
            {quests.filter(
              (quest) => quest.type === "main" && quest.status !== "complete",
            ).length > 0 && (
              <>
                <h1 className="mb-2 text-2xl text-red-900">Main Quests</h1>
                {quests
                  .filter(
                    (quest) =>
                      quest.type === "main" && quest.status !== "complete",
                  )
                  .map((quest, index) => (
                    <div key={index} onClick={() => handleQuestClick(quest)}>
                      <Quest
                        title={quest.title}
                        type={quest.type}
                        status={quest.status}
                      />
                    </div>
                  ))}
              </>
            )}
            {quests.filter(
              (quest) =>
                quest.type === "recurring" && quest.status !== "complete",
            ).length > 0 && (
              <>
                <h1 className="mb-2 mt-4 text-2xl text-red-900">
                  Daily Quests
                </h1>
                {quests
                  .filter(
                    (quest) =>
                      quest.type === "recurring" && quest.status !== "complete",
                  )
                  .map((quest, index) => (
                    <div key={index} onClick={() => handleQuestClick(quest)}>
                      <Quest
                        title={quest.title}
                        type={quest.type}
                        status={quest.status}
                      />
                    </div>
                  ))}
              </>
            )}
            {quests.filter((quest) => quest.status === "complete").length >
              0 && (
              <>
                <h1 className="mb-2 mt-4 text-2xl text-red-900">
                  Complete Quests
                </h1>
                {quests
                  .filter((quest) => quest.status === "complete")
                  .map((quest, index) => (
                    <div key={index} onClick={() => handleQuestClick(quest)}>
                      <Quest
                        title={quest.title}
                        type={quest.type}
                        status={quest.status}
                      />
                    </div>
                  ))}
              </>
            )}
          </>
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
