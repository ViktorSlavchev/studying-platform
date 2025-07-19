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
import SLink from "../ui/SLink";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

import { litTopics } from "../utils/topics";
import IconWrapper from "../ui/IconWrapper";
import { useQuotes } from "../features/quotes/useQuotes";
import Spinner from "../ui/Spinner";

// Storage helpers
const STORAGE_KEY = "quotesGameState";
const GAME_DURATION_MS = 3 * 60 * 1000;

function saveGameState(state) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
	console.log("Game state saved:", JSON.stringify(state));
}

function loadGameState() {
	const raw = localStorage.getItem(STORAGE_KEY);
	if (!raw) return null;
	try {
		console.log("Loading game state:", raw);
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
	const [answeredQuestions, setAnsweredQuestions] = useState(0);
	const [gameStatus, setGameStatus] = useState("in-progress");
	const [isError, setIsError] = useState(false);
	const timeoutRef = useRef(null);
	const [hasLoadedState, setHasLoadedState] = useState(false);

	const currentQuote = quotes?.[currentQuoteIndex];

	const endGame = () => {
		setGameStatus("completed");
		clearGameState();
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
	};

	const handleSubmitAnswer = () => {
		if (!answer.trim()) return;

		const isCorrect = answer.toLowerCase().trim() === currentQuote.answer.toLowerCase().trim();
		console.log(`Checking answer: ${answer} against ${currentQuote.answer}`);

		if (isCorrect) {
			setScore(score + 1);
			setAnsweredQuestions(answeredQuestions + 1);
			setAnswer("");
			setIsError(false);

			if (currentQuoteIndex < quotes.length - 1) {
				setCurrentQuoteIndex(currentQuoteIndex + 1);
			} else {
				setGameStatus("no-more-questions");
			}
		} else {
			setIsError(true);
			setTimeout(() => setIsError(false), 500);
		}
	};

	// Load saved game state or start a new game
	useEffect(() => {
		const saved = loadGameState();
		if (saved) {
			const timeElapsed = Date.now() - new Date(saved.startedAt).getTime();
			if (timeElapsed < GAME_DURATION_MS) {
				setStartedAt(new Date(saved.startedAt));
				setCurrentQuoteIndex(saved.currentQuoteIndex || 0);
				setAnsweredQuestions(saved.answeredQuestions || 0);
				setScore(saved.score || 0);

				const remainingTime = GAME_DURATION_MS - timeElapsed;
				timeoutRef.current = setTimeout(() => {
					endGame();
				}, remainingTime);

				setHasLoadedState(true);
				return;
			} else {
				endGame();
			}
		}

		const now = new Date();
		setStartedAt(now);
		timeoutRef.current = setTimeout(() => {
			endGame();
		}, GAME_DURATION_MS);
		setHasLoadedState(true);
	}, []);

	// Save game state periodically
	useEffect(() => {
		if (gameStatus === "in-progress" && hasLoadedState) {
			saveGameState({
				currentQuoteIndex,
				startedAt,
				answeredQuestions,
				score,
			});
		}
	}, [currentQuoteIndex, startedAt, answeredQuestions, score, gameStatus, hasLoadedState]);

	if (isLoading) {
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
