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

  const updateBot = async id => {
    const updatedBot = await updateBotData(id);

    console.log('updatedBot', updatedBot);
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
        getBots,
        createBot,
        updateBot,
        deleteBot,
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
}
