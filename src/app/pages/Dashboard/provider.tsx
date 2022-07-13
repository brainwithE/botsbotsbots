import React from 'react';
import {
  getBots,
  insertBot,
  updateBotData,
  deleteBotData,
} from 'utils/firebase';

interface Props {
  children: React.ReactNode;
}

const DashboardContext = React.createContext<any>({});

export function useDashboard() {
  return React.useContext(DashboardContext);
}

export function DashboardProvider(props: Props) {
  const [botList, setBotList] = React.useState({});

  React.useEffect(() => {
    handleGetBots();
  }, []);

  const handleGetBots = async () => {
    const botList = await getBots();

    setBotList(botList || {});
  };

  const createBot = async () => {
    const newBot = await insertBot();

    setBotList({ ...newBot, ...botList });
  };

  const updateBot = async id => {
    const updatedBot = await updateBotData(id);

    console.log('updatedBot', updatedBot);
  };

  const deleteBot = async id => {
    await deleteBotData(id);
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
