import { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";
import Sort from "./Sort";
import Designation from "./Designation";
import Pagination from "./Pagination";
import Search from "./Search";
import process from 'process';
import "./PaginatedRecord.css";

const base_url = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:5050/paginatedData/'; // API URL

function PaginatedRecord() {
	const [obj, setObj] = useState({});
	const [sort, setSort] = useState({ sort: "f_id", order: "desc" });
	const [filterDesignation, setFilterDesignation] = useState([]);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");

	useEffect(() => {
		const getAllEmployees = async () => {
			try {
				const url = `${base_url}?page=${page}&sort=${sort.sort},${
					sort.order
				}&designation=${filterDesignation.toString()}&search=${search}`;
				const { data } = await axios.get(url);
				setObj(data);
			} catch (err) {
				console.log(err);
			}
		};

		getAllEmployees();
	}, [sort, filterDesignation, page, search]);

	return (
		<div className="wrapper">
			<div className="container">
				<div className="head">
					<img src="https://www.dealsdray.com/wp-content/uploads/2023/11/logo_B2R.png" alt="logo" className="logo" />
					<Search setSearch={(search) => setSearch(search)} />
				</div>
				<div className="body">
					<div className="table_container">
						<Table employees={obj.employees ? obj.employees : []} />
						<Pagination
							page={page}
							limit={obj.limit ? obj.limit : 0}
							total={obj.total ? obj.total : 0}
							setPage={(page) => setPage(page)}
						/>
					</div>
					<div className="filter_container">
						<Sort sort={sort} setSort={(sort) => setSort(sort)} />
						<Designation
							filterDesignation={filterDesignation}
							designations={obj.designations ? obj.designations : []}
							setFilterDesignation={(designation) => setFilterDesignation(designation)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PaginatedRecord;
