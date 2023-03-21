import { useState } from "react";

const Pagination = (props) => {
    const [currentPage, setCurrentPage] = useState(1);

    const nextPage = () => {
        if (currentPage !== props.totalPages) {
            setCurrentPage(currentPage + 1);
            props.pageChangeHandler(currentPage + 1);
            return;
        }
        props.pageChangeHandler(currentPage);
    }

    const prevPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
            props.pageChangeHandler(currentPage + 1);
            return;
        }
        props.pageChangeHandler(currentPage);
    };

    return (
        <div className="pagination">
            <button className={currentPage !== 1 ? "button" : "button-inv"} onClick={prevPage}></button>
                <span className={currentPage !== 1 ? "sidepage-left" : "sidepage-left-inv"}>{currentPage - 1}...</span>
                <span className="page">{currentPage}</span>
                <span className={currentPage !== props.totalPages ? "sidepage-right" : "sidepage-right-inv"}>...{currentPage + 1}</span>
            <button className={currentPage !== props.totalPages ? "button" : "button-inv"} onClick={nextPage}></button>
        </div>
    );
};

export default Pagination;