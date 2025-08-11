import Center from "../../ui/Center";
import ExpandableText from "../../ui/ExpandableText";
import Table from "../../ui/Table";
import PropTypes from "prop-types";

function TableComments({ comments, onClick, selected }) {
	return (
		<Table columns="4fr 6fr 1fr">
			<Table.Header>
				<div>Цитат</div>
				<div>Теза</div>
				<Center>Точки</Center>
			</Table.Header>
			<Table.Body
				data={comments}
				render={(thesis, ind) => (
					<Table.Row
						key={thesis["_id"]}
						$selected={selected === ind}
						onClick={() => {
							onClick(ind);
						}}
						style={{ cursor: "pointer" }}
					>
						<ExpandableText>{thesis.quote}</ExpandableText>
						<ExpandableText>{thesis.comment}</ExpandableText>
						<Center>{thesis.points}</Center>
					</Table.Row>
				)}
			></Table.Body>
		</Table>
	);
}
TableComments.propTypes = {
	comments: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
			quote: PropTypes.node,
			comment: PropTypes.node,
			points: PropTypes.node,
		})
	).isRequired,
	onClick: PropTypes.func.isRequired,
	selected: PropTypes.number,
};

export default TableComments;
