import { useState, useEffect } from "react";
import { GiJusticeStar } from "react-icons/gi";

import Spinner from "@/components/common/spinner";
import PreviewQuestModal from "./PreviewQuestModal";
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
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewQuestModalOpen, setIsPreviewQuestModalOpen] = useState(false);
  const { quests, setQuests } = useQuests();

  const handleQuestUpdate = (updatedQuest: TQuest) => {
    setSelectedQuest(updatedQuest);

    setQuests((prevQuests) =>
      prevQuests.map((quest) =>
        quest.questId === updatedQuest.questId ? updatedQuest : quest
      )
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
      <div className="flex items-center border-x-[10px] border-t-[10px] p-2 border-red-900 bg-amber-50">
        <GiJusticeStar className="text-red-900 text-3xl mr-2 border-2 border-red-900 bg-white" />
        <h1 className="text-xl text-red-900 w-full pl-2 border-2 border-red-900 bg-white">
          Quests
        </h1>
      </div>
      <div className="h-full lg:h-[656px] p-2 px-6 border-[10px] border-red-900 bg-amber-50 overflow-x-hidden overflow-y-auto">
        {isLoading ? (
          <div className="mt-2 flex justify-center items-center">
            <Spinner size={3} />
          </div>
        ) : (
          <>
            {quests.filter(
              (quest) => quest.type === "main" && quest.status !== "complete"
            ).length > 0 && (
              <>
                <h1 className="mb-2 text-2xl text-red-900">Main Quests</h1>
                {quests
                  .filter(
                    (quest) =>
                      quest.type === "main" && quest.status !== "complete"
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
                quest.type === "recurring" && quest.status !== "complete"
            ).length > 0 && (
              <>
                <h1 className="mb-2 text-2xl text-red-900 mt-4">
                  Daily Quests
                </h1>
                {quests
                  .filter(
                    (quest) =>
                      quest.type === "recurring" && quest.status !== "complete"
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
                <h1 className="mb-2 text-2xl text-red-900 mt-4">
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
