import { useState, useEffect } from 'react';
import { queryList } from '../services/ant-design-pro/api';

const useQueryList = (url: string) => {
  const [items, setItems] = useState<API.ListItem[] | undefined>([]);

  const query = async () => {
    const { data } = await queryList(url, { pageSize: 10000 });
    setItems(data);
  };

  useEffect(() => {
    query();
  }, []);

  return { items, setItems };
};

export default useQueryList;
