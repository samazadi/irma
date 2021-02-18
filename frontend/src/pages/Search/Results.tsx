const Results = () => {
    return (
        <div className="results-wrapper shadow">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">ISBN</th>
                        <th scope="col">Description</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Rent</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>Description 1</td>
                        <td>5</td>
                        <td>
                            <button className="btn btn-primary">Borrow</button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        <td>Description 2</td>
                        <td>0</td>
                        <td>
                            <button disabled={true} className="btn btn-primary">Borrow</button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                        <td>Description 3</td>
                        <td>5</td>
                        <td>
                            <button className="btn btn-primary">Borrow</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Results;