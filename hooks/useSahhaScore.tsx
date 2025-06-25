import { useEffect, useState } from 'react';

export default function useSahhaScore(date: string) {
  const [data, setData] = useState<any>(null);

  const fetchData = async () => {
    const response = await fetch(
      'https://sandbox-api.sahha.ai/api/v1/profile/score?endDateTime=2025-06-24&startDateTime=2025-06-18&types=activity'
    );
    const result = await response.json();
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data };
}
