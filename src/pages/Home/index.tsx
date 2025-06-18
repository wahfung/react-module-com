import { useState, useEffect } from 'react';
import { config } from '../../../configs/env';
console.log(config);
const HomePage = () => {
  const [data, setData] = useState({});

  const getList = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/list`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const res = await response.json();
      setData(res);
    } catch (error) {
      console.error('获取失败:', error);
      throw error;
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <h1>
        HomePage
        {JSON.stringify(data)}
      </h1>
    </>
  );
};
export default HomePage;
