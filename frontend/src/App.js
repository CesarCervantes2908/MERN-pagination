import './App.css';
import React, { useEffect, useState } from 'react'
import Pagination from './components/Pagination';
import Card from './components/Card';

const App = ({ match }) => {
  const pageNumber = parseInt(match.params.pageNumber) || 1;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(pageNumber);
  const [pages, setPages] = useState(1);

  useEffect(()=>{
    setLoading(true);
    const fetchPosts = async()=>{
      try {
        const response = await fetch(`/api/v1/posts?page=${page}`);
        const { data, pages: totalPages } = await response.json();
        setPages(totalPages);
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError("Something went wrong");
      };
    };

    fetchPosts();
  }, [page]);
  return(
    <div className="app">
      {loading ? (<h3 className="loading-text">Loading...</h3>)
        : error ? (<h3 className="error-text">{error}</h3>)
      : (
        <>
              <Pagination page={page} pages={pages} changePage={setPage} />
              <div className="app__posts">
                {posts.map(post => (
                  <Card key={post._id} post={post} />
                ))}
              </div>
              <Pagination page={page} pages={pages} changePage={setPage} />
        </>
      )}
    </div>
  );
};

export default App;


