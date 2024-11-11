/* eslint-disable react/prop-types */
import styles from "./styles.module.css";

const Table = ({ employees }) => {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				<p className={styles.name_tab}>Name</p>
				<p className={styles.designation_tab}>Designation</p>
				<p className={styles.email_tab}>Email</p>
			</div>
			{employees.map((employee) => (
				<div className={styles.employee} key={employee.f_id}>
					<div className={styles.title_container}>
					<img src={`data:image/png;base64,${employee.f_Image}`}></img>   
						<p className={styles.movie_title}>
							{employee.f_Name} ({employee.f_CreatedDate})
						</p>
					</div>
					<div className={styles.designation_container}>
						{employee.f_Designation.map((designation, index) => (
							<p key={designation} className={styles.designation_genre}>
								{designation}
								{index !== employee.f_Designation.length - 1 && "/"}
							</p>
						))}
					</div>
					<div className={styles.title_container}>
						<img src={employee.img} alt="movie" className={styles.movie_img} />
						<p className={styles.movie_title}>
							{employee.name} ({employee.year})
						</p>
					</div>
					<div className={styles.title_container}>
						<img src={employee.img} alt="movie" className={styles.movie_img} />
						<p className={styles.movie_title}>
							{employee.name} ({employee.year})
						</p>
					</div>
					<div className={styles.title_container}>
						<img src={employee.img} alt="movie" className={styles.movie_img} />
						<p className={styles.movie_title}>
							{employee.name} ({employee.year})
						</p>
					</div>
					<div className={styles.title_container}>
						<img src={employee.img} alt="movie" className={styles.movie_img} />
						<p className={styles.movie_title}>
							{employee.name} ({employee.year})
						</p>
					</div>
					<div className={styles.title_container}>
						<img src={employee.img} alt="movie" className={styles.movie_img} />
						<p className={styles.movie_title}>
							{employee.name} ({employee.year})
						</p>
					</div>
					<div className={styles.title_container}>
						<img src={employee.img} alt="movie" className={styles.movie_img} />
						<p className={styles.movie_title}>
							{employee.name} ({employee.year})
						</p>
					</div>
					<div className={styles.title_container}>
						<img src={employee.img} alt="movie" className={styles.movie_img} />
						<p className={styles.movie_title}>
							{employee.name} ({employee.year})
						</p>
					</div>
				</div>
			))}
		</div>
	);
};


export default Table;
