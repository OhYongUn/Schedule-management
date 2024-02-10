import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyles from "./styles/GlobalStyles.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout.jsx";
import FullCalendarComponent from "./pages/FullCalendarComponent.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
      <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <GlobalStyles />
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<AppLayout />}>
                      <Route index element={<FullCalendarComponent />} /> {/* 중첩 라우트로 수정 */}
                  </Route>
              </Routes>
          </BrowserRouter>
      </QueryClientProvider>
  );
}

export default App;
