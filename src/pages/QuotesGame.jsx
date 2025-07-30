import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import InfoBox from "../ui/InfoBox";
import Text from "../ui/Text";
import InputAutofill from "../ui/InputAutofill";
import Button from "../ui/Button";
import TimeLeftBoxQuotes from "../features/quotes/TimeLeftBoxQuotes";
import MultipleLines from "../ui/MultipleLines";
import Spinner from "../ui/Spinner";
import SLink from "../ui/SLink";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

import { litTopics } from "../utils/topics";
import IconWrapper from "../ui/IconWrapper";
import { useQuotes } from "../features/quotes/useQuotes";
import { seededShuffle } from "../utils/seededShuffle";
import { useSaveScore } from "../features/quotes/useSaveScore";

// Storage helpers
const STORAGE_KEY = "quotesGameState";
const GAME_DURATION_MS = 3 * 60 * 1000;

function saveGameState(state) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadGameState() {
	const raw = localStorage.getItem(STORAGE_KEY);
	if (!raw) return null;
	try {
		return JSON.parse(raw);
	} catch {
		return null;
	}
}

function clearGameState() {
	localStorage.removeItem(STORAGE_KEY);
}

const RightColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
	align-self: flex-start;
	position: sticky;
	top: 2rem;
`;

const QuoteBox = styled(InfoBox)`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	padding: 2.4rem 3.6rem;
	min-height: 30rem;
	justify-content: center;
	flex: 1;
`;

const QuoteText = styled(Text)`
	font-style: italic;
	font-size: 1.8rem;
	line-height: 1.8;
	text-align: center;
	padding: 2.4rem 0;
	flex-grow: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const GameArea = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	flex: 2;
	min-width: 0;
`;

const InputWrapper = styled.div`
	border: 2px solid ${({ $isError }) => ($isError ? "red" : "var(--color-border)")};
	border-radius: var(--border-radius-sm);
	transition: border-color 0.3s ease;
	width: 100%;

	${({ $isError }) =>
		$isError &&
		`
		animation: shake 0.5s ease-in-out;
	`}

	@keyframes shake {
		0%,
		100% {
			transform: translateX(0);
		}
		25% {
			transform: translateX(-5px);
		}
		75% {
			transform: translateX(5px);
		}
	}
`;

function QuotesGame() {
	const { quotes, isLoading } = useQuotes();

	const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
	const [answer, setAnswer] = useState("");
	const [startedAt, setStartedAt] = useState(new Date());
	const [score, setScore] = useState(0);
	const [totalAttempts, setTotalAttempts] = useState(0);
	const [answeredQuestions, setAnsweredQuestions] = useState(0);
	const [gameStatus, setGameStatus] = useState("in-progress");
	const [isError, setIsError] = useState(false);
	const [prevGuess, setPrevGuess] = useState("");
	const timeoutRef = useRef(null);
	const [hasLoadedState, setHasLoadedState] = useState(false);
	const [shuffledQuotes, setShuffledQuotes] = useState([]);
	const { saveScore, isLoading: isSavingScore } = useSaveScore();

	const currentQuote = shuffledQuotes?.[currentQuoteIndex] ?? null;

	const endGame = (delta = 0) => {
		if (isSavingScore) return; // Prevent multiple saves

		const savedScore = loadGameState()?.score + delta;
		const savedTotalAttempts = loadGameState()?.totalAttempts + delta;

		if (savedScore) saveScore({ correct: savedScore, score: Math.round((savedScore * savedScore) / savedTotalAttempts) || 0 });

		setGameStatus("completed");
		clearGameState();
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
	};

	const handleSubmitAnswer = () => {
		if (!answer.trim() || isError || answer.toLowerCase().trim() === prevGuess) return;

		// Check if this is the same as the previous incorrect guess
		if (answer.toLowerCase().trim() === prevGuess.toLowerCase().trim()) return;

		const isCorrect = answer.toLowerCase().trim() === currentQuote.answer.toLowerCase().trim();

		if (isCorrect) {
			setScore(score + 1);
			setTotalAttempts(totalAttempts + 1);
			setAnsweredQuestions(answeredQuestions + 1);
			setAnswer("");
			setIsError(false);
			setPrevGuess(""); // Reset previous guess on correct answer

			if (currentQuoteIndex < quotes.length - 1) {
				setCurrentQuoteIndex(currentQuoteIndex + 1);
			} else {
				setGameStatus("no-more-questions");
				endGame(1);
			}
		} else {
			setPrevGuess(answer.toLowerCase().trim()); // Save the incorrect guess
			setIsError(true);
			setTotalAttempts(totalAttempts + 1);
			setTimeout(() => setIsError(false), 500);
		}
	};

	// Load saved game state or start a new game
	useEffect(() => {
		if (!quotes || quotes.length === 0 || isLoading) return;

		const saved = loadGameState();
		if (saved && quotes.length > 0) {
			const timeElapsed = Date.now() - new Date(saved.startedAt).getTime();
			if (timeElapsed < GAME_DURATION_MS) {
				setStartedAt(new Date(saved.startedAt));
				setCurrentQuoteIndex(saved.currentQuoteIndex || 0);
				setAnsweredQuestions(saved.answeredQuestions || 0);
				setScore(saved.score || 0);
				setTotalAttempts(saved.totalAttempts || 0);
				setShuffledQuotes(seededShuffle(quotes, saved.seed));
				const remainingTime = GAME_DURATION_MS - timeElapsed;
				timeoutRef.current = setTimeout(endGame, remainingTime);
				setHasLoadedState(true);
				return;
			}
		}

		// Start new game
		const seed = Math.floor(Math.random() * 1000000000);
		const now = new Date();
		setStartedAt(now);
		setShuffledQuotes(seededShuffle(quotes, seed));
		timeoutRef.current = setTimeout(endGame, GAME_DURATION_MS);
		saveGameState({ currentQuoteIndex: 0, startedAt: now, answeredQuestions: 0, score: 0, seed });
		setHasLoadedState(true);
	}, [quotes, isLoading]);

	// Reset previous guess when question changes
	useEffect(() => {
		setPrevGuess("");
	}, [currentQuoteIndex]);

	// Save game state periodically
	useEffect(() => {
		if (gameStatus === "in-progress" && hasLoadedState) {
			const saved = loadGameState();
			saveGameState({
				currentQuoteIndex,
				startedAt,
				answeredQuestions,
				score,
				seed: saved?.seed || 0, // fallback if ever missing
				totalAttempts,
			});
		}
	}, [currentQuoteIndex, startedAt, answeredQuestions, score, gameStatus, hasLoadedState, totalAttempts]);

	if (isLoading || !hasLoadedState || !currentQuote || isSavingScore) {
		return <Spinner />;
	}

	return (
		<>
			<Heading>Игра с цитати</Heading>
			<Row style={{ width: "100%" }} $gap="3.2rem">
				<GameArea>
					{gameStatus !== "in-progress" ? (
						<QuoteBox>
							<Text style={{ textAlign: "center" }} $weight="bold" $size="2rem">
								Верни отговори: {score}
							</Text>
							<Text style={{ textAlign: "center" }} $weight="bold" $size="2rem">
								Успеваемост: {Math.round((score / totalAttempts) * 100) || 0}%
							</Text>
							<Text style={{ textAlign: "center" }} $weight="bold" $size="2rem">
								Резултат: {Math.round((score * score) / totalAttempts) || 0}
							</Text>
							<SLink to="/quotes" style={{ textAlign: "center" }}>
								Назад{"  "}
								<IconWrapper $inheritsize={true}>
									<ArrowUturnLeftIcon />
								</IconWrapper>
							</SLink>
						</QuoteBox>
					) : (
						<QuoteBox>
							<QuoteText>
								<MultipleLines text={currentQuote.quote} />
							</QuoteText>
							<Row $direction="column" $gap="1.6rem" style={{ padding: "0 4.8rem" }}>
								<InputWrapper $isError={isError}>
									<InputAutofill value={answer} onChange={setAnswer} onSelect={handleSubmitAnswer} list={litTopics} placeholder="Въведете име на произведение..." disabled={gameStatus === "completed"} style={{ border: "none", outline: "none", width: "100%" }} />
								</InputWrapper>
								{gameStatus !== "completed" && (
									<Row $justify="center">
										<Button onClick={handleSubmitAnswer} disabled={!answer.trim()}>
											Провери
										</Button>
									</Row>
								)}
							</Row>
						</QuoteBox>
					)}
				</GameArea>

				<RightColumn style={{ flex: 1, minWidth: "0" }}>
					<TimeLeftBoxQuotes status={gameStatus === "completed" ? "completed" : "in-progress"} startedAt={startedAt} answeredQuestionsCount={answeredQuestions} score={score} />
				</RightColumn>
			</Row>
		</>
	);
}

export default QuotesGame;
