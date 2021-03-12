import "./Pagination.css";
import { Link } from 'react-router-dom';


const Pagination = ({ page, pages, changePage }) => {
    let middlePagination;

    if (pages <= 5) {
        middlePagination = [...Array(pages)].map((_, idx) => (
            <Link to={`/page/${idx + 1}`}>
                <button
                    key={idx + 1}
                    onClick={() => changePage(idx + 1)}
                    disabled={page === idx + 1}
                >
                    {idx + 1}
                </button>
            </Link>
        ));
    } else {
        const startValue = Math.floor((page - 1) / 5) * 5;

        middlePagination = (
            <>
                {[...Array(5)].map((_, idx) => (
                    <Link to={`/page/${startValue + idx + 1}`}>
                        <button
                            key={startValue + idx + 1} 
                            disabled={page === startValue + idx + 1}
                            onClick={() => changePage(startValue + idx + 1)}
                        >
                            {startValue + idx + 1}
                        </button>
                    </Link>
                ))}
                <button>...</button>
                <Link to={`/page/${pages}`}>
                    <button onClick={() => changePage(pages)}>
                        {pages}
                    </button>
                </Link>
            </>
        );

        if (page > 5) {
            if (pages - page >= 5) {
                middlePagination = (
                    <>
                        <Link to={`/page/1`}>
                            <button onClick={() => changePage(1)}>1</button>
                        </Link>
                        <button>...</button>
                        <Link to={`/page/${startValue}`}>
                            <button onClick={() => changePage(startValue)}>
                                {startValue}
                            </button>
                        </Link>
                        {[...Array(5)].map((_, idx) => (
                            <Link to={`/page/${startValue + idx + 1}`}>
                                <button
                                    key={startValue + idx + 1}
                                    disabled={page === startValue + idx + 1}
                                    onClick={() => changePage(startValue + idx + 1)}
                                >
                                    {startValue + idx + 1}
                                </button>
                            </Link>
                        ))}

                        <button>...</button>
                        <Link to={`/page/${pages}`}>
                            <button onClick={() => changePage(pages)}>
                                {pages}
                            </button>
                        </Link>
                    </>
                );
            } else {
                let amountLeft = pages - page + 5;
                middlePagination = (
                    <>
                        <Link to={`/page/1`}>
                            <button onClick={() => changePage(1)}>1</button>
                        </Link>
                        <button>...</button>
                        <Link to={`/page/${startValue}`}>
                            <button onClick={() => changePage(startValue)}>
                                {startValue}
                            </button>
                        </Link>
                        {[...Array(amountLeft)].map((_, idx) => (
                            <Link to={`/page/${startValue + idx + 1}`}>
                                <button
                                    key={startValue + idx + 1}
                                    disabled={page === startValue + idx + 1}
                                    style={
                                        pages < startValue + idx + 1 ? { display: "none" } : null
                                    }
                                    onClick={() => changePage(startValue + idx + 1)}
                                >
                                    {startValue + idx + 1}
                                </button>
                            </Link>
                        ))}
                    </>
                );
            }
        }
    }

    return (
        pages > 1 && (
            <div className="pagination">
                <Link to={`/page/${page - 1}`}>
                <button
                    className="pagination__prev"
                    onClick={() => changePage((page) => page - 1)}
                    disabled={page === 1}
                >
                    &#171;
                </button>
                </Link>
                {middlePagination}
                <Link to={`/page/${page + 1}`}>
                    <button
                        className="pagination__next"
                        onClick={() => changePage((page) => page + 1)}
                        disabled={page === pages}
                    >
                        &#187;
                    </button>
                </Link>
            </div>
        )
    );
};

export default Pagination;