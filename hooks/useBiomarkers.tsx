import { useEffect, useState } from 'react';

export default function useBiomarkers() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      fetch(
        'https://sandbox-api.sahha.ai/api/v1/profile/biomarker?categories=activity&endDateTime=2025-06-24&startDateTime=2025-06-24&types=steps&types=floors_climbed&types=active_hours&types=active_duration&types=activity_low_intensity_duration&types=activity_medium_intensity_duration&types=activity_high_intensity_duration&types=activity_sedentary_duration&types=active_energy_burned&types=total_energy_burned',
        {
          method: 'GET',
          headers: {
            Authorization:
              'profile eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2FwaS5zYWhoYS5haS9jbGFpbXMvcHJvZmlsZUlkIjoiMmRlM2VmMmItYjRhZi00YmJhLThjNjctZTA0ZTBmMzFiZmQzIiwiaHR0cHM6Ly9hcGkuc2FoaGEuYWkvY2xhaW1zL2V4dGVybmFsSWQiOiI3ODg0YTg2Ni00YWUxLTQ5NDUtOWZiYS1iMmI4ZDJiN2M1YTkiLCJodHRwczovL2FwaS5zYWhoYS5haS9jbGFpbXMvYWNjb3VudElkIjoiNDMxMTAxZjAtNzZkNC00MThmLWIzYTktNGMyOTlkZTAyODU1IiwiaHR0cHM6Ly9hcGkuc2FoaGEuYWkvY2xhaW1zL3NhaGhhQXBpU2NvcGUiOiJTYW5kYm94IiwiaHR0cHM6Ly9hcGkuc2FoaGEuYWkvY2xhaW1zL3JlZ2lvbiI6IlVTIiwiaHR0cHM6Ly9hcGkuc2FoaGEuYWkvY2xhaW1zL3JvbGUiOiJwcm9maWxlX293bmVyIiwiZXhwIjoxNzUwODEwNjU3LCJpc3MiOiJodHRwczovL3NhbmRib3gtYXBpLnNhaGhhLmFpIiwiYXVkIjoiaHR0cHM6Ly9zYW5kYm94LWFwaS5zYWhoYS5haSJ9.gPpo7_uKg2UAZXvntR8crkDYxEgQv4fLdMIOXJvuOIY',
          },
        }
      )
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error('Error:', error));
    };
    fetchData();
  }, []);

  return { data };
}
