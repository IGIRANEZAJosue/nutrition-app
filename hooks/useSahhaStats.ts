import { useState, useEffect } from 'react';
import Sahha, { SahhaSensor } from 'sahha-react-native';

const useSahhaStats = (sensor: SahhaSensor) => {
  const [stats, setStats] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = () => {
      setLoading(true);
      setError(null);
      setStats(null);

      const date = new Date();

      Sahha.getStats(sensor, date.getTime(), date.getTime(), (error: string, value: string) => {
        if (error) {
          console.error(`Error: ${error}`);
        } else if (value) {
          const jsonArray = JSON.parse(value);
          const jsonString = JSON.stringify(jsonArray);
          console.log(value);
        }
      });
    };

    if (sensor) {
      fetchStats();
    }
  }, [sensor]);

  return { stats, loading, error };
};

export default useSahhaStats;
