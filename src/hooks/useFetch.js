import { useState, useEffect } from "react";

// HasQuery used as an argument to stop fetch from happening on first render
const useFetch = (url, hasQuery) => {
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (hasQuery) {
      setIsLoading(true);
      fetch(url, {
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((data) => {
              throw new Error(data.message);
            });
          } else {
            return res.json();
          }
        })
        .then((data) => {
          setIsLoading(false);
          setData(data);
          console.log(data);
        })
        .catch((err) => {
          setIsError(true);
          setIsLoading(false);
          setErrorMessage(err.message);
          console.log(`Error msg: ${err.message}`);
        });
    }
  }, [url]);
  
  return { data, errorMessage, isError, isLoading };
};

export default useFetch;
