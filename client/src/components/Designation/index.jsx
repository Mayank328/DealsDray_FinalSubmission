/* eslint-disable react/prop-types */
import styles from "./styles.module.css";

const Designation = ({ designations, filterDesignation, setFilterDesignation }) => {
	const onChange = ({ currentTarget: input }) => {
		if (input.checked) {
			const state = [...filterDesignation, input.value];
			setFilterDesignation(state);
		} else {
			const state = filterDesignation.filter((val) => val !== input.value);
			setFilterDesignation(state);
		}
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Filter By Genre</h1>
			<div className={styles.designation_container}>
				{designations.map((designation) => (
					<div className={styles.designation} key={designation}>
						<input
							className={styles.designation_input}
							type="checkbox"
							value={designation}
							onChange={onChange}
						/>
						<p className={styles.designation_label}>{designation}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Designation;
