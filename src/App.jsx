import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";

import Home from "./pages/Home";
import Exams from "./pages/Exams";
import CommentCheck from "./pages/CommentCheck";
import DailyMission from "./pages/DailyMission";
import QuotesPage from "./pages/QuotesPage";
import WrongQuestions from "./pages/WrongQuestions";
import AskAI from "./pages/AskAI";
import ContactUs from "./pages/ContactUs";
import SettingsPage from "./pages/SettingsPage";
import PageNotFound from "./pages/PageNotFound";
import Exam from "./pages/Exam";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./ui/ProtectedRoute";
import QuotesGame from "./pages/QuotesGame";

const queryClient = new QueryClient({
	queryDefaults: [
		{
			queryKey: [],
			queryFn: async () => {},
			staleTime: 5 * 60 * 1000, // 5 minutes
		},
	],
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<GlobalStyles />
			<Toaster position="top-right" reverseOrder={false} />

			<BrowserRouter>
				<Routes>
					<Route
						element={
							<ProtectedRoute>
								<AppLayout />
							</ProtectedRoute>
						}
					>
						<Route index element={<Navigate replace to="home" />} />
						<Route path="/home" element={<Home />} />
						<Route path="/exams" element={<Exams />} />
						<Route path="/comment" element={<CommentCheck />} />
						<Route path="/daily" element={<DailyMission />} />
						<Route path="/quotes" element={<QuotesPage />} />
						<Route path="/quotes/game" element={<QuotesGame />} />
						<Route path="/mistakes" element={<WrongQuestions />} />
						<Route path="/ai" element={<AskAI />} />
						<Route path="/contact-us" element={<ContactUs />} />
						<Route path="/settings" element={<SettingsPage />} />
						<Route path="/exam/:id" element={<Exam />} />
					</Route>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>

			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
