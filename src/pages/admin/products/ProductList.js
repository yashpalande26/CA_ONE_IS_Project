import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductList() {
    const[products,setProducts] = useState([])

    const[search, setSearch] = useState("")

    const[sortColumn, setSortColumn] = useState({column: "id", orderBy: "asc"})


    function getProducts(){
        fetch("http://localhost:4000/products?q=" + search + "&_sort=" + sortColumn.column + "&_order=" + sortColumn.orderBy)
        .then(response => {
            if (response.ok){
                return response.json()
            }
            throw new Error()

        })
        .then(data => {
            setProducts(data)
        })
        .catch(error => {
            alert("Unable to get data")
        })
    }

    useEffect(getProducts, [search,sortColumn])

    function deleteProduct(id) {
        fetch("http://localhost:4000/products/" + id, {method: "DELETE"})
        .then(response => {
            if (!response.ok) {
                throw new Error()
            }
            getProducts()
        })
        .catch(error => {
            alert("Unable to delete the product")
        })
    }

    function handleSearch(event){
        event.preventDefault() //To stop the brower from submitting the form to the server..

        let text = event.target.elements.search.value
        setSearch(text)

    }

    function sortTable(column) {
        let orderBy = "asc"

        if (column === sortColumn.column) {
            if (sortColumn.orderBy === "desc") orderBy = "desc"
            else orderBy = "desc"
        }

        setSortColumn({column: column, orderBy: orderBy})
    }


    return(
        <div className="container my-4">
            <h2 className="text-center mb-4">Products</h2>

            <div className="row mb-3">
                <div className="col">
                    <Link className="btn btn-outline-success me-1" to="/admin/products/create" role="button">Create Product</Link>
                    <button type="button" className="btn btn-outline-info"
                        onClick={getProducts}>Refresh</button>
                </div>
                <div className="col">
                    <form className="d-flex" onSubmit={handleSearch}>
                        <input className="form-control me-2" type="search" placeholder="Search" name="search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form> 
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Category</th>
                            <th onClick={() => sortTable("price")}>
                                Price
                            </th>
                            <th>Image</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, index) => {
                                return(
                                    <tr key={index}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.brand}</td>
                                        <td>{product.category}</td>
                                        <td>{product.price}</td>
                                        <td><img src={"http://localhost:4000/images/"+ product.imageFilename}
                                            width="100" alt="....."/></td>
                                        <td>{product.createdAt}</td>
                                        <td style={{width:"10px", whiteSpace:"nowrap"}}>
                                            <Link className="btn btn-sm me-1" 
                                                style={{
                                                    backgroundColor: "#4CAF50", 
                                                    color: "white",
                                                    padding: "8px 12px",
                                                    fontSize: "14px",
                                                    borderRadius: "4px",
                                                    textDecoration: "none",
                                                    transition: "background-color 0.3s ease"
                                                }}
                                                to={"/admin/products/edit/" + product.id}>
                                                Edit
                                            </Link>
                                            <button 
                                                type="button" 
                                                className="btn btn-sm" 
                                                style={{
                                                    backgroundColor: "#f44336",
                                                    color: "white",
                                                    padding: "8px 12px",
                                                    fontSize: "14px",
                                                    borderRadius: "4px",
                                                    cursor: "pointer",
                                                    transition: "background-color 0.3s ease"
                                                }}
                                                onClick={() => deleteProduct(product.id)}
                                                onMouseEnter={(e) => e.target.style.backgroundColor = "#d32f2f"} // Hover effect
                                                onMouseLeave={(e) => e.target.style.backgroundColor = "#f44336"} // Reset hover
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>

            </div>
        </div>
    )
}   