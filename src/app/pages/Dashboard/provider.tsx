import React from 'react';
import { faker } from '@faker-js/faker';

import {
  getBots,
  insertBot,
  updateBotData,
  deleteBotData,
} from 'utils/firebase';
import { generateBotName } from 'utils/randomizer';
import { useAuth } from 'app/providers/AuthProvider';

interface Props {
  children: React.ReactNode;
}

const DashboardContext = React.createContext<any>({});

export function useDashboard() {
  return React.useContext(DashboardContext);
}

export function DashboardProvider(props: Props) {
  const [botList, setBotList] = React.useState({});
  const [selectedBot, setSelectedBot] = React.useState<any>();
  const [isBotFormOpen, setIsBotFormOpen] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const { userProfile } = useAuth();

  React.useEffect(() => {
    handleGetBots();
  }, []);

  const handleGetBots = async () => {
    const botList = await getBots();

    setBotList(botList || {});
  };

  const createBot = async () => {
    const generatedBot = {
      name: generateBotName(faker.name.firstName()),
      catchphrase: faker.company.catchPhrase(),
      timestamp: Date.now(),
      createdBy: { uid: userProfile.uid, email: userProfile.email },
    };
    const newBot = await insertBot(generatedBot);

    setBotList({ ...botList, ...newBot });
  };

  const updateBot = async (id, updatedValues) => {
    setIsProcessing(true);

    const updatedBot = await updateBotData(id, updatedValues);
    const key = Object.entries(updatedBot)[0][0];
    const value = Object.entries(updatedBot)[0][1];

    const oldBot = botList[key];

    Object.assign(oldBot, value);

    setIsProcessing(false);
  };

  const deleteBot = async id => {
    await deleteBotData(id);
    delete botList[id];

    setBotList(botList);
  };

  return (
    <DashboardContext.Provider
      value={{
        botList,
        selectedBot,
        setSelectedBot,
        getBots,
        createBot,
        updateBot,
        deleteBot,
        isBotFormOpen,
        setIsBotFormOpen,
        isProcessing,
        setIsProcessing,
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
}
