import Row from "../../ui/Row";
import Input from "../../ui/Input";
import Dropdown from "../../ui/Dropdown";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import styled from "styled-components";
import Text from "../../ui/Text";

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

function CommentForm() {
	return (
		<Row style={{ width: "100%" }} $align="flex-start" $justify="space-between" $gap="4.8rem">
			<Row $direction="column" $gap="1.6rem" $align="center" style={{ flex: 1 }}>
				<Row $gap="1.6rem" style={{ width: "100%" }}>
					<StyledInput placeholder="Напишете цитатът тук" />
					<Dropdown style={{ maxWidth: "35%" }}>
						{options.map((option, index) => (
							<Dropdown.Option key={index} value={option.value}>
								{option.label}
							</Dropdown.Option>
						))}
					</Dropdown>
				</Row>
				<StyledTextarea placeholder="Напишете тезата си тук" />
				<Button>Провери</Button>
			</Row>
			<Row style={{ flex: 1 }} $direction="column" $align="flex-start" $gap="0.4rem">
				<Text>
					<Text as="span" $weight="bold">
						Оценка:
					</Text>{" "}
					5 / 6
				</Text>
				<Text>
					<Text as="span" $weight="bold">
						Коментар:
					</Text>{" "}
					Тезата е логически изградена и вярно тълкува смисъла на цитата. Добре се открояват идейните внушения и ценностните послания. Липсва обаче изрично посочване на жанра и по-ясно разграничаване на ключовите думи и изразните средства. С малки допълнения текстът ще бъде отличен.
				</Text>
			</Row>
		</Row>
	);
}

export default CommentForm;
