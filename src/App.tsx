import { Provider } from "@/components/ui/provider";
import GisModule from "@/modules/GisModule";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <GisModule />
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
