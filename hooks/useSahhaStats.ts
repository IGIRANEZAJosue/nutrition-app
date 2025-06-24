import { useState, useCallback } from 'react';
import Sahha, { SahhaSensor } from 'sahha-react-native';

const useSahhaStats = () => {
  const [stats, setStats] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);

  const fetchData = useCallback(async (types: string) => {
    setLoading(true);
    setError(null);

    const startDateTime = '2025-06-18';
    const endDateTime = '2025-06-24';
    const token =
      'profile eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2FwaS5zYWhoYS5haS9jbGFpbXMvcHJvZmlsZUlkIjoiMmRlM2VmMmItYjRhZi00YmJhLThjNjctZTA0ZTBmMzFiZmQzIiwiaHR0cHM6Ly9hcGkuc2FoaGEuYWkvY2xhaW1zL2V4dGVybmFsSWQiOiI3ODg0YTg2Ni00YWUxLTQ5NDUtOWZiYS1iMmI4ZDJiN2M1YTkiLCJodHRwczovL2FwaS5zYWhoYS5haS9jbGFpbXMvYWNjb3VudElkIjoiNDMxMTAxZjAtNzZkNC00MThmLWIzYTktNGMyOTlkZTAyODU1IiwiaHR0cHM6Ly9hcGkuc2FoaGEuYWkvY2xhaW1zL3NhaGhhQXBpU2NvcGUiOiJTYW5kYm94IiwiaHR0cHM6Ly9hcGkuc2FoaGEuYWkvY2xhaW1zL3JlZ2lvbiI6IlVTIiwiaHR0cHM6Ly9hcGkuc2FoaGEuYWkvY2xhaW1zL3JvbGUiOiJwcm9maWxlX293bmVyIiwiZXhwIjoxNzUwODA3NjYzLCJpc3MiOiJodHRwczovL3NhbmRib3gtYXBpLnNhaGhhLmFpIiwiYXVkIjoiaHR0cHM6Ly9zYW5kYm94LWFwaS5zYWhoYS5haSJ9.rVw7mDK2fICdmtjYeHKm5B4PELftPWFdkBt-0vc9T6E';

    try {
      const response = await fetch(
        'https://sandbox-api.sahha.ai/api/v1/profile/biomarker?categories=activity&endDateTime=2025-06-24&startDateTime=2025-06-22&types=steps&types=floors_climbed&types=active_hours&types=active_duration&types=activity_low_intensity_duration&types=activity_medium_intensity_duration&types=activity_high_intensity_duration&types=activity_sedentary_duration&types=active_energy_burned&types=total_energy_burned',
        {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('result', result);
      setData(result);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { stats, loading, error, data, fetchData };
};

export default useSahhaStats;
