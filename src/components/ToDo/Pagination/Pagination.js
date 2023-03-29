import './Pagination.css'
import { useState } from "react";

const Pagination = (props) => {
    const [currentPage, setCurrentPage] = useState(props.currentPage);

    const nextPage = () => {
        if (props.currentPage !== props.numberOfPages) {
            setCurrentPage(props.currentPage + 1);
            props.changePageHandler(props.currentPage + 1);
        } else {
            props.changePageHandler(props.currentPage);
        }
    };

    const prevPage = () => {
        if (props.currentPage !== 1) {
            setCurrentPage(props.currentPage - 1);
            props.changePageHandler(props.currentPage - 1);
        } else {
            props.changePageHandler(props.currentPage);
        }
    };

    return (
        <div className="pagination">
            <div className="previous-page-button-container">
                <button disabled={props.currentPage === 1 ? true : false}  onClick={prevPage}>←</button>
            </div>
            Number of pages: {props.numberOfPages}
            <div className="next-page-button-container">
                <button disabled={props.currentPage === props.numberOfPages ? true : false} onClick={nextPage}>→</button>
            </div>
        </div>
    );
};

export default Pagination;