/**
 * Dashboard Provider
 */
import React from 'react';

import { faker } from '@faker-js/faker';

import { useAlert } from 'app/providers/AlertProvider';
import { useAuth } from 'app/providers/AuthProvider';
import {
  getAllBotsData,
  insertBotData,
  updateBotData,
  removeBotData,
} from 'utils/firebase';
import { generateBotName } from 'utils/randomizer';

interface Props {
  children: React.ReactNode;
}

const DashboardContext = React.createContext<any>({});

export function useDashboard() {
  return React.useContext(DashboardContext);
}

export function DashboardProvider(props: Props): JSX.Element {
  const [botList, setBotList] = React.useState({});
  const [selectedBot, setSelectedBot] = React.useState<any>();
  const [isBotFormOpen, setIsBotFormOpen] = React.useState(false);
  const [isBotDetailsOpen, setIsBotDetailsOpen] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const { userProfile } = useAuth();
  const { alert } = useAlert();

  React.useEffect(() => {
    handleGetAllBots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetAllBots = async () => {
    setIsProcessing(true);

    const botList = await getAllBotsData();

    setBotList(botList || {});
    setIsProcessing(false);
  };

  const createBot = async () => {
    setIsProcessing(true);

    const generatedBot = {
      name: generateBotName(faker.name.firstName()),
      purpose: '',
      catchphrase: faker.company.catchPhrase(),
      timestamp: Date.now(),
      createdBy: { uid: userProfile.uid, email: userProfile.email },
    };

    const newBot = await insertBotData(generatedBot);

    await alert('Bot created successfully', 'success', 3000);

    await setBotList({ ...newBot, ...botList });

    setIsProcessing(false);
  };

  const updateBot = async (id, updatedValues) => {
    setIsProcessing(true);

    const updatedBot = await updateBotData(id, updatedValues);
    const key = Object.entries(updatedBot)[0][0];
    const value = Object.entries(updatedBot)[0][1];

    const oldBot = botList[key];

    Object.assign(oldBot, value);

    await alert('Bot updated successfully', 'success', 3000);

    setIsProcessing(false);
  };

  const deleteBot = async (id, uid) => {
    try {
      setIsProcessing(true);

      await removeBotData(id, uid);
      await delete botList[id];

      setBotList(botList);
      await alert('Bot deleted successfully', 'success');
    } catch (error) {
      alert('Failed! Please try again later.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        botList,
        selectedBot,
        isBotFormOpen,
        isProcessing,
        isBotDetailsOpen,
        setSelectedBot,
        createBot,
        updateBot,
        deleteBot,
        setIsBotFormOpen,
        setIsProcessing,
        setIsBotDetailsOpen,
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
}
