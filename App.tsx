import { onlineManager, QueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import ExercisesPage from "./ExercisesPage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OfflineBanner from "./OfflineBanner";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { useAsyncStorageDevTools } from "@dev-plugins/async-storage";

const queryClient = new QueryClient();

const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
  throttleTime: 3000,
});

const App = () => {
  const [isOnline, setIsOnline] = useState(true);
  useReactQueryDevTools(queryClient);
  useAsyncStorageDevTools();

  useEffect(() => {
    return NetInfo.addEventListener((state) => {
      const status = !!state.isConnected;
      console.log("isOnline", status);
      setIsOnline(status);
      onlineManager.setOnline(status);
    });
  }, []);

  return (
    <SafeAreaProvider>
      <PersistQueryClientProvider
        persistOptions={{ persister }}
        onSuccess={() =>
          queryClient
            .resumePausedMutations()
            .then(() => queryClient.invalidateQueries())
        }
        client={queryClient}
      >
        {!isOnline && <OfflineBanner />}
        <ExercisesPage />
      </PersistQueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;
