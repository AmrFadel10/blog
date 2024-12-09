import React, { useEffect } from "react";
import SidebarDashboard from "./SidebarDashboard";
import "./admin-table.css";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteCategoryApiCall,
	getCategoryApiCall,
} from "../redux/apicalls/categoryApiCall";

const CategoriesDashboard = () => {
	const { categories } = useSelector((state) => state.category);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCategoryApiCall());
	}, []);
	const deleteOne = (catID) => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover this category!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((isOk) => {
			if (isOk) {
				dispatch(deleteCategoryApiCall(catID));
			}
		});
	};
	return (
		<section className="container-table-page">
			<SidebarDashboard />
			<div className="admin-table">
				<h5 className="title-header">Categories</h5>
				<table className="table-container">
					<thead>
						<tr>
							<th>Count</th>
							<th>Category title</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{categories.map((item, index) => (
							<tr key={item._id}>
								<td className="number">{index + 1}</td>
								<td>
									<div className="img-and-name">{item.title}</div>
								</td>
								<td>
									<div className="table-btns-group">
										<button
											onClick={() => deleteOne(item._id)}
											style={{ backgroundColor: "var(--red-color)" }}
										>
											Delete
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
};

export default CategoriesDashboard;
