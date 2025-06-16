import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<GlobalStyles />
			<Toaster position="top-right" reverseOrder={false} />

			<BrowserRouter>
				<Routes>
					<Route element={<AppLayout />}>
						<Route index element={<Navigate replace to="home" />} />
						<Route path="/home" element={<Home />} />
						<Route path="/exams" element={<Exams />} />
						<Route path="/comment" element={<CommentCheck />} />
						<Route path="/daily" element={<DailyMission />} />
						<Route path="/quotes" element={<QuotesPage />} />
						<Route path="/mistakes" element={<WrongQuestions />} />
						<Route path="/ai" element={<AskAI />} />
						<Route path="/contact-us" element={<ContactUs />} />
						<Route path="/settings" element={<SettingsPage />} />
						<Route path="/exam/:id" element={<Exam />} />
					</Route>
					<Route path="/login" element={<Login />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
