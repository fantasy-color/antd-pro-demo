import { useState, useEffect } from 'react';
import { queryList } from '../services/ant-design-pro/api';

const useQueryList = (url: string) => {
  const [items, setItems] = useState([]);

  const query = async () => {
    const res = (await queryList(url, { pageSize: 10000 })) as any;
    setItems(res.data);
  };

  useEffect(() => {
    query().catch(console.error);
  }, []);

  return { items, setItems };
};

export default useQueryList;
