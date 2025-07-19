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
	const [startedAt] = useState(new Date());
	const [score, setScore] = useState(0);
	const [answeredQuestions, setAnsweredQuestions] = useState(0);
	const [gameStatus, setGameStatus] = useState("in-progress");
	const [isError, setIsError] = useState(false);
	const timeoutRef = useRef(null);

	useEffect(() => {
		const gameTime = 3 * 60 * 1000; // 3 minutes
		timeoutRef.current = setTimeout(() => {
			endGame();
		}, gameTime);

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	if (isLoading) {
		return <Spinner />;
	}

	const currentQuote = quotes[currentQuoteIndex];

	const endGame = () => {
		setGameStatus("completed");
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
	};

	const handleSubmitAnswer = () => {
		if (!answer.trim()) return;

		// Check if answer is correct
		const isCorrect = answer.toLowerCase().trim() === currentQuote.answer.toLowerCase().trim();
		console.log(`Checking answer: ${answer} against ${currentQuote.answer}`);

		if (isCorrect) {
			setScore(score + 1);
			setAnsweredQuestions(answeredQuestions + 1);
			setAnswer("");
			setIsError(false);

			// Move to next question or stop if no more questions
			if (currentQuoteIndex < quotes.length - 1) {
				setCurrentQuoteIndex(currentQuoteIndex + 1);
			} else {
				// No more questions - just stop, don't end game
				setGameStatus("no-more-questions");
			}
		} else {
			// Wrong answer - show error and let user try again
			setIsError(true);
			setTimeout(() => setIsError(false), 500);
		}
	};

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
