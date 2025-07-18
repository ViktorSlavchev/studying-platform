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

// Sample quotes - replace with your actual data source
const sampleQuotes = [
	{
		_id: "68288bb9b285dfe59c2bfb9f",
		quote: "Не те познават даже децата ти сами",
		type: "text",
		answer: "Отечество любезно, как хубаво си ти!",
		thesisOk: true,
		theme: "Отечество любезно, как хубаво си ти!",
	},
	{
		_id: "68288bcab285dfe59c2bfba2",
		quote: "едно име ново, голямо антично,\nкато Термопили славно, безгранично",
		type: "text",
		answer: "Опълченците на Шипка",
		thesisOk: true,
		theme: "Опълченците на Шипка",
	},
	{
		_id: "68288c95b285dfe59c2bfba5",
		quote: "Една дълга агония!...",
		type: "text",
		answer: "Немили-недраги",
		thesisOk: true,
		theme: "Немили-недраги",
	},
	{
		_id: "68288d1ab285dfe59c2bfba8",
		quote: "Комитите! Комитите! - извикаха гласове",
		type: "text",
		answer: "Една българка",
		thesisOk: false,
		theme: "Една българка",
	},
	{
		_id: "68288d30b285dfe59c2bfbab",
		quote: "Там е огън сега - ще го предадат на турците",
		type: "text",
		answer: "Една българка",
		thesisOk: false,
		theme: "Една българка",
	},
	{
		_id: "68288d6bb285dfe59c2bfbae",
		quote: "Докога, братя, да се губим?\nЗащо не се съберем?",
		type: "text",
		answer: "Стани, стани, юнак балкански",
		thesisOk: true,
		theme: "Стани, стани, юнак балкански",
	},
	{
		_id: "68288da9b285dfe59c2bfbb1",
		quote: "Бунтовникът тръгна из гората, цял потресен, безнадежден.",
		type: "text",
		answer: "Една българка",
		thesisOk: false,
		theme: "Една българка",
	},
	{
		_id: "68288deab285dfe59c2bfbb6",
		quote: "Вслушал ли се е някой досега\nв мелодьята на твойте звуци сладки?",
		type: "text",
		answer: "Българският език",
		thesisOk: true,
		theme: "Българският език",
	},
	{
		_id: "683428dbb88925d51fea5c5a",
		quote: "Селянката се окахъри, да имаше криле, щеше да го вземе и да хвръкне с него.",
		type: "text",
		answer: "Една българка",
		thesisOk: true,
		theme: "Една българка",
	},
	{
		_id: "6878af5215ddd3ef57b22889",
		quote: "Пък който иска, та тегли -\nтежко му нима ще кажа?",
		type: "text",
		answer: "Хайдути",
		thesisOk: false,
		theme: "Хайдути",
	},
	{
		_id: "6878af8e15ddd3ef57b2288c",
		quote: "Кой не знай Чавдар войвода,\nкой не е слушал за него?",
		type: "text",
		answer: "Хайдути",
		thesisOk: false,
		theme: "Хайдути",
	},
	{
		_id: "6878afcf15ddd3ef57b2288f",
		quote: "Хубава си, моя горо,\nмиришеш на младост,",
		type: "text",
		answer: "Хубава си, моя горо",
		thesisOk: true,
		theme: "Хубава си, моя горо",
	},
	{
		_id: "6878affe15ddd3ef57b22892",
		quote: "но вселяваш в сърцата ни\nсамо скръб и жалост:",
		type: "text",
		answer: "Хубава си, моя горо",
		thesisOk: false,
		theme: "Хубава си, моя горо",
	},
	{
		_id: "6878b03a15ddd3ef57b22895",
		quote: "той не може, дорде е жив,\nда те заборави.",
		type: "text",
		answer: "Хубава си, моя горо",
		thesisOk: true,
		theme: "Хубава си, моя горо",
	},
	{
		_id: "6878b06f15ddd3ef57b22898",
		quote: "Ти рай си, да; но кой те прилично оценява?",
		type: "text",
		answer: "Отечество любезно, как хубаво си ти!",
		thesisOk: true,
		theme: "Отечество любезно, как хубаво си ти!",
	},
	{
		_id: "6878b08c15ddd3ef57b2289b",
		quote: "Не те познават даже децата ти сами",
		type: "text",
		answer: "Отечество любезно, как хубаво си ти!",
		thesisOk: true,
		theme: "Отечество любезно, как хубаво си ти!",
	},
	{
		_id: "6878b54515ddd3ef57b2289e",
		quote: "и под студът, и под снегът\nживот се захваща.",
		type: "text",
		answer: "Хубава си, моя горо",
		thesisOk: false,
		theme: "Хубава си, моя горо",
	},
	{
		_id: "6878b58515ddd3ef57b228a1",
		quote: "горите ти са пълни с хармония и хлад,\nдолините с трендафил, гърдите с благодат.",
		type: "text",
		answer: "Отечество любезно, как хубаво си ти!",
		thesisOk: false,
		theme: "Отечество любезно, как хубаво си ти!",
	},
	{
		_id: "6878b5aa15ddd3ef57b228a4",
		quote: "Ти сбираш в едно всички блага и дарове:\nхляб, свила, рози, нектар, цветя и плодове,",
		type: "text",
		answer: "Отечество любезно, как хубаво си ти!",
		thesisOk: false,
		theme: "Отечество любезно, как хубаво си ти!",
	},
	{
		_id: "6878b5c215ddd3ef57b228a7",
		quote: "но ний не видим нищо, нам нищо не ни тряба,\nдоволно е, че даваш покривката и хляба,",
		type: "text",
		answer: "Отечество любезно, как хубаво си ти!",
		thesisOk: false,
		theme: "Отечество любезно, как хубаво си ти!",
	},
	{
		_id: "6878b5d715ddd3ef57b228aa",
		quote: "Какви ли тайни дремят, богатства, красоти\nпо твоите долини, поля и висоти?",
		type: "text",
		answer: "Отечество любезно, как хубаво си ти!",
		thesisOk: false,
		theme: "Отечество любезно, как хубаво си ти!",
	},
	{
		_id: "6878b64015ddd3ef57b228ad",
		quote: "Марица тихо подплиснуваше мътните си води, пълни с удавници...",
		type: "text",
		answer: "Косачи",
		thesisOk: false,
		theme: "Косачи",
	},
	{
		_id: "6878b67215ddd3ef57b228b0",
		quote: "и ние в тебе, майко, ще умрем чужденци!",
		type: "text",
		answer: "Отечество любезно, как хубаво си ти!",
		thesisOk: true,
		theme: "Отечество любезно, как хубаво си ти!",
	},
	{
		_id: "6878b6b515ddd3ef57b228b3",
		quote: "Мир и ведрина повея от дълбокото звездно небе. Земята отвори страстните си гърди и замря в наслада.",
		type: "text",
		answer: "Косачи",
		thesisOk: false,
		theme: "Косачи",
	},
	{
		_id: "6878b6ea15ddd3ef57b228b6",
		quote: "Остави я за пуста печалба… Усилни годините станаха, какво да се прави!",
		type: "text",
		answer: "Косачи",
		thesisOk: false,
		theme: "Косачи",
	},
	{
		_id: "6878b70915ddd3ef57b228b9",
		quote: "Подигравките на другарите му се забиваха като остри игли в сърцето и спираха дъха му от мъки.",
		type: "text",
		answer: "Косачи",
		thesisOk: false,
		theme: "Косачи",
	},
	{
		_id: "6878b72915ddd3ef57b228bc",
		quote: "Със самодивските си целувки тя като усойница змия изсмуквала из устата им кърви, алени кърви, и ги пила...",
		type: "text",
		answer: "Косачи",
		thesisOk: false,
		theme: "Косачи",
	},
	{
		_id: "6878b77d15ddd3ef57b228bf",
		quote: "Проклето сърце, такава му е пустата направа.",
		type: "text",
		answer: "Косачи",
		thesisOk: false,
		theme: "Косачи",
	},
	{
		_id: "6878b79415ddd3ef57b228c2",
		quote: "Падна чудна лятна нощ, прохладна и свежа.",
		type: "text",
		answer: "Косачи",
		thesisOk: false,
		theme: "Косачи",
	},
	{
		_id: "6878bd2615ddd3ef57b22907",
		quote: "Нощта мълчеше. Само щурците тихо и едногласно църкаха: Пенка, Пенка, Пенка…",
		type: "text",
		answer: "Косачи",
		thesisOk: false,
		theme: "Косачи",
	},
	{
		_id: "6878bd6415ddd3ef57b2290a",
		quote: "Ама защо ти е тая пуста истина?",
		type: "text",
		answer: "Косачи",
		thesisOk: true,
		theme: "Косачи",
	},
	{
		_id: "6878bd7c15ddd3ef57b2290d",
		quote: "Чудновати, но хубави! Слушаш, слушаш и се забравяш…",
		type: "text",
		answer: "Косачи",
		thesisOk: true,
		theme: "Косачи",
	},
	{
		_id: "6878bd9215ddd3ef57b22910",
		quote: "И песните са затова… да те измъкнат от истината, за да разбереш, че си човек.",
		type: "text",
		answer: "Косачи",
		thesisOk: true,
		theme: "Косачи",
	},
	{
		_id: "6878bdf915ddd3ef57b22913",
		quote: "Колко гола беше, колко бедна\nстаята с мъртвешките очи!",
		type: "text",
		answer: "Художник",
		thesisOk: true,
		theme: "Художник",
	},
	{
		_id: "6878be1615ddd3ef57b22916",
		quote: "Закачи по мъртвите пустини\nизвори и пътища, и бряг,",
		type: "text",
		answer: "Художник",
		thesisOk: false,
		theme: "Художник",
	},
	{
		_id: "6878be3315ddd3ef57b22919",
		quote: "закачи света и го затвори\nв тези грозни четири стени.",
		type: "text",
		answer: "Художник",
		thesisOk: false,
		theme: "Художник",
	},
	{
		_id: "6878be4c15ddd3ef57b2291c",
		quote: "Той отвори и се спря на прага.\nГледаха го празните стени.",
		type: "text",
		answer: "Художник",
		thesisOk: false,
		theme: "Художник",
	},
	{
		_id: "6878be6315ddd3ef57b2291f",
		quote: "той превърна стаята в богата,\nв най-богата стая на света.",
		type: "text",
		answer: "Художник",
		thesisOk: true,
		theme: "Художник",
	},
	{
		_id: "6878c80d4a2548e4b282f776",
		quote: "Сълзите, както и смехът, са заразителни.",
		type: "text",
		answer: "Представлението, Под игото",
		thesisOk: false,
		theme: "Представлението, Под игото",
	},
	{
		_id: "6878c83e4a2548e4b282f779",
		quote: "То го очакваше нетърпеливо, като някое голямо събитие, което щеше да внесе приятно разнообразие...",
		type: "text",
		answer: "Представлението, Под игото",
		thesisOk: false,
		theme: "Представлението, Под игото",
	},
	{
		_id: "6878c8764a2548e4b282f77c",
		quote: "Това падна като гръм небесен в залата.",
		type: "text",
		answer: "Представлението, Под игото",
		thesisOk: true,
		theme: "Представлението, Под игото",
	},
	{
		_id: "6878c89f4a2548e4b282f77f",
		quote: "Песента цепеше въздуха, разпаляше и опияняваше сърцата.",
		type: "text",
		answer: "Представлението, Под игото",
		thesisOk: true,
		theme: "Представлението, Под игото",
	},
	{
		_id: "6878c8c64a2548e4b282f782",
		quote: "Той бе изклинчил благоразумно, още когато се запя опасната песен, като не пожела да дочака лаврите на публиката.",
		type: "text",
		answer: "Представлението, Под игото",
		thesisOk: false,
		theme: "Представлението, Под игото",
	},
	{
		_id: "6878c9074a2548e4b282f785",
		quote: "Скоро ще чуеш и по-друга песен и нея ще я разбереш...",
		type: "text",
		answer: "Представлението, Под игото",
		thesisOk: false,
		theme: "Представлението, Под игото",
	},
	{
		_id: "6878c9784a2548e4b282f788",
		quote: "Чинеше й се, че потъва в земята. Нещо я душеше гърдите, идеше й да заплаче с глас — и едвам се удържаше.",
		type: "text",
		answer: "Радини вълнения, Под игото",
		thesisOk: false,
		theme: "Радини вълнения, Под игото",
	},
	{
		_id: "6878c9c34a2548e4b282f78b",
		quote: "Тоз ли бе шпионинът! Той сега стоеше като ангел хранител неин!",
		type: "text",
		answer: "Радини вълнения, Под игото",
		thesisOk: false,
		theme: "Радини вълнения, Под игото",
	},
	{
		_id: "6878c9db4a2548e4b282f78e",
		quote: "Името му, ново и странно, обикаляше по всичките уста и се запечатваше в сърцата.",
		type: "text",
		answer: "Радини вълнения, Под игото",
		thesisOk: false,
		theme: "Радини вълнения, Под игото",
	},
	{
		_id: "6878ca074a2548e4b282f791",
		quote: "Прозрачни розови облачета, играещи по бузите й, издаваха трептението на свенливата й душа.",
		type: "text",
		answer: "Радини вълнения, Под игото",
		thesisOk: false,
		theme: "Радини вълнения, Под игото",
	},
	{
		_id: "6878ca284a2548e4b282f794",
		quote: "Сърцето й се изпълни с признателно вълнение, а очите й със сълзи…",
		type: "text",
		answer: "Радини вълнения, Под игото",
		thesisOk: false,
		theme: "Радини вълнения, Под игото",
	},
	{
		_id: "6878ca824a2548e4b282f797",
		quote: "Те са цветя, поникнали под покрив: невесели и без дъх.",
		type: "text",
		answer: "Радини вълнения, Под игото",
		thesisOk: false,
		theme: "Радини вълнения, Под игото",
	},
	{
		_id: "6878cb2d4a2548e4b282f79a",
		quote: "Ти целия скован от злоба си,\nо, шумен и разблуден град,",
		type: "text",
		answer: "Братчетата на Гаврош",
		thesisOk: true,
		theme: "Братчетата на Гаврош",
	},
	{
		_id: "6878cb424a2548e4b282f79d",
		quote: "и колко скръб в очите трескави,\nи колко мъка се чете!",
		type: "text",
		answer: "Братчетата на Гаврош",
		thesisOk: false,
		theme: "Братчетата на Гаврош",
	},
	{
		_id: "6878cb534a2548e4b282f7a0",
		quote: "Съдбата рано ги излъгала,\nживота сграбчил ги отвред",
		type: "text",
		answer: "Братчетата на Гаврош",
		thesisOk: false,
		theme: "Братчетата на Гаврош",
	},
	{
		_id: "6878cb704a2548e4b282f7a3",
		quote: "а тез витрини са обсипани\nс безброй жадувани неща…",
		type: "text",
		answer: "Братчетата на Гаврош",
		thesisOk: false,
		theme: "Братчетата на Гаврош",
	},
	{
		_id: "6878cb834a2548e4b282f7a6",
		quote: "и твойте електрични глобуси\nвсуе тъй празнично блестят!",
		type: "text",
		answer: "Братчетата на Гаврош",
		thesisOk: true,
		theme: "Братчетата на Гаврош",
	},
	{
		_id: "6878cba04a2548e4b282f7a9",
		quote: "Но тръгват си те пак одрипани,\nс въздишки плахи на уста,",
		type: "text",
		answer: "Братчетата на Гаврош",
		thesisOk: false,
		theme: "Братчетата на Гаврош",
	},
	{
		_id: "6878cbac4a2548e4b282f7ac",
		quote: "и ето ги: стоят на ъгъла,\nс прихлупен до очи каскет.",
		type: "text",
		answer: "Братчетата на Гаврош",
		thesisOk: false,
		theme: "Братчетата на Гаврош",
	},
	{
		_id: "6878cc194a2548e4b282f7af",
		quote: "Посред лято в тая страшна жега, тоя човек беше навлякъл дълго зимно палто...",
		type: "text",
		answer: "Серафим",
		thesisOk: false,
		theme: "Серафим",
	},
	{
		_id: "6878cc2c4a2548e4b282f7b2",
		quote: "Той беше от града, но търсеше работа по селата.",
		type: "text",
		answer: "Серафим",
		thesisOk: false,
		theme: "Серафим",
	},
	{
		_id: "6878cc684a2548e4b282f7b5",
		quote: "Жената излезе от кафенето и си отиде. Тя тъй беше се забрадила, че лицето й не се виждаше.",
		type: "text",
		answer: "Серафим",
		thesisOk: false,
		theme: "Серафим",
	},
	{
		_id: "6878cc8f4a2548e4b282f7b8",
		quote: "едно време то ще е било синьо, ще е било от един плат, но сега нищо не личеше",
		type: "text",
		answer: "Серафим",
		thesisOk: false,
		theme: "Серафим",
	},
	{
		_id: "6878cce54a2548e4b282f7bb",
		quote: "Да те вземе мътната, да те вземе. Мисля си: какъв ще е тоз изпаднал германец!",
		type: "text",
		answer: "Серафим",
		thesisOk: false,
		theme: "Серафим",
	},
	{
		_id: "6878cd304a2548e4b282f7be",
		quote: "Може пък там да ми дадат ново палто, златно, тъй да се каже, скъпоценно...",
		type: "text",
		answer: "Серафим",
		thesisOk: true,
		theme: "Серафим",
	},
	{
		_id: "6878cd414a2548e4b282f7c1",
		quote: "Той пусна палтото на колената си, позагледа се пред себе си и се усмихна.",
		type: "text",
		answer: "Серафим",
		thesisOk: true,
		theme: "Серафим",
	},
].sort(() => Math.random() - 0.5);

function QuotesGame() {
	const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
	const [answer, setAnswer] = useState("");
	const [startedAt] = useState(new Date());
	const [score, setScore] = useState(0);
	const [answeredQuestions, setAnsweredQuestions] = useState(0);
	const [gameStatus, setGameStatus] = useState("in-progress");
	const [isError, setIsError] = useState(false);
	const timeoutRef = useRef(null);

	const currentQuote = sampleQuotes[currentQuoteIndex];

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
			if (currentQuoteIndex < sampleQuotes.length - 1) {
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
