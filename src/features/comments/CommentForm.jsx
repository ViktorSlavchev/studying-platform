import Row from "../../ui/Row";
import Input from "../../ui/Input";
import Dropdown from "../../ui/Dropdown";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import styled from "styled-components";
import Text from "../../ui/Text";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useGrader } from "./useGrader";
import SpinnerMini from "../../ui/SpinnerMini";
import toast from "react-hot-toast";
import { isGibberish } from "../../utils/isGibberish";

const options = [
	{ value: "Хайдути", label: "Хайдути" },
	{ value: "Хубава си, моя горо", label: "Хубава си, моя горо" },
	{ value: "Отечество любезно, как хубаво си ти!", label: "Отечество любезно, как хубаво си ти!" },
	{ value: "Косачи", label: "Косачи" },
	{ value: "Художник", label: "Художник" },
	{ value: "Под игото", label: "Под игото" },
	{ value: "Братчетата на Гаврош", label: "Братчетата на Гаврош" },
	{ value: "Серафим", label: "Серафим" },
	{ value: "Стани, стани, юнак балкански", label: "Стани, стани, юнак балкански" },
	{ value: "Вятър ечи, Балкан стене", label: "Вятър ечи, Балкан стене" },
	{ value: "На прощаване в 1868г", label: "На прощаване в 1868г" },
	{ value: "Немили-недраги", label: "Немили-недраги" },
	{ value: "Една българка", label: "Една българка" },
	{ value: "Опълченците на Шипка", label: "Опълченците на Шипка" },
	{ value: "Българският език", label: "Българският език" },
	{ value: "До Чикаго и назад", label: "До Чикаго и назад" },
	{ value: "Бай Ганьо", label: "Бай Ганьо" },
	{ value: "Неразделни", label: "Неразделни" },
	{ value: "Заточеници", label: "Заточеници" },
	{ value: "По жътва", label: "По жътва" },
	{ value: "По жицата", label: "По жицата" },
];

const StyledInput = styled(Input)`
	width: 100%;
`;

const StyledTextarea = styled(Textarea)`
	width: 100%;
	height: 16rem;
`;

const ResponsiveRow = styled(Row)`
	width: 100%;

	margin-bottom: 4.8rem;

	@media (max-width: 768px) {
		flex-direction: column !important;
		gap: 3rem !important;
	}
`;

const FormSection = styled(Row)`
	flex: 1;

	@media (max-width: 768px) {
		width: 100%;
	}
`;

const FeedbackSection = styled(Row)`
	flex: 1;

	@media (max-width: 768px) {
		width: 100%;
	}
`;

function CommentForm({ selectedComment, onInput }) {
	const [quote, setQuote] = useState("");
	const [thesis, setThesis] = useState("");
	const [selectedTopic, setSelectedTopic] = useState("Хайдути");

	const { grade, isLoading } = useGrader();

	useEffect(() => {
		if (selectedComment) {
			setQuote(selectedComment.quote);
			setThesis(selectedComment.comment);
			setSelectedTopic(selectedComment.text);
		}
	}, [selectedComment]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!quote || !thesis || !selectedTopic) {
			toast.error("Моля, попълнете всички полета.");
			return;
		}

		if (quote.length < 10) {
			toast.error("Цитатът трябва да е поне 10 символа.");
			return;
		}

		if (thesis.length < 60) {
			toast.error("Тезата трябва да е поне 60 символа.");
			return;
		}

		if (isGibberish(thesis)) {
			toast.error("Тезата изглежда като безсмислица. Моля, опитайте отново.");
			return;
		}
		if (isGibberish(quote)) {
			toast.error("Цитатът изглежда като безсмислица. Моля, опитайте отново.");
			return;
		}

		grade({ quote, comment: thesis, text: selectedTopic });
	};

	return (
		<ResponsiveRow $align="flex-start" $justify="space-between" $gap="4.8rem">
			<FormSection $direction="column" $gap="1.6rem" $align="center">
				<Row $gap="1.6rem" style={{ width: "100%" }}>
					<StyledInput
						placeholder="Напишете цитатът тук"
						value={quote}
						onChange={(e) => {
							setQuote(e.target.value);
							onInput();
						}}
					/>
					<Dropdown
						style={{ maxWidth: "35%" }}
						value={selectedTopic}
						onChange={(e) => {
							setSelectedTopic(e.target.value);
							onInput();
						}}
					>
						{options.map((option, index) => (
							<Dropdown.Option key={index} value={option.value}>
								{option.label}
							</Dropdown.Option>
						))}
					</Dropdown>
				</Row>
				<StyledTextarea
					placeholder="Напишете тезата си тук"
					value={thesis}
					onChange={(e) => {
						setThesis(e.target.value);
						onInput();
					}}
				/>
				<Button onClick={handleSubmit} disabled={isLoading}>
					{isLoading ? <SpinnerMini /> : "Провери"}
				</Button>
			</FormSection>
			<FeedbackSection $direction="column" $align="flex-start" $gap="0.4rem">
				<Text>
					<Text as="span" $weight="bold">
						Оценка:
					</Text>{" "}
					{selectedComment ? selectedComment.points : 0} / 6
				</Text>
				<Text>
					<Text as="span" $weight="bold">
						Коментар:
					</Text>{" "}
					{selectedComment ? selectedComment.feedback : ""}
				</Text>
			</FeedbackSection>
		</ResponsiveRow>
	);
}
CommentForm.propTypes = {
	selectedComment: PropTypes.shape({
		quote: PropTypes.string,
		comment: PropTypes.string,
		text: PropTypes.string,
		points: PropTypes.number,
		feedback: PropTypes.string,
	}),
	onInput: PropTypes.func,
};

export default CommentForm;
