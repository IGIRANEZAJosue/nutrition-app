import { useEffect, useState } from 'react';

import { Biomarker } from '~/utils/api';

export default function useBiomarkers() {
  const [data, setData] = useState<Biomarker[]>([]);

  useEffect(() => {
    fetch(
      'https://sandbox-api.sahha.ai/api/v1/profile/biomarker?categories=activity&categories=sleep&categories=vitals&endDateTime=2025-06-25&startDateTime=2025-06-19&types=steps&types=floors_climbed&types=active_hours&types=active_duration&types=activity_high_intensity_duration&types=active_energy_burned&types=total_energy_burned&types=sleep_start_time&types=sleep_end_time&types=sleep_duration&types=sleep_efficiency&types=heart_rate_resting',
      {
        method: 'GET',
        headers: {
          Authorization:
            'profile eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2FwaS5zYWhoYS5haS9jbGFpbXMvcHJvZmlsZUlkIjoiMmRlM2VmMmItYjRhZi00YmJhLThjNjctZTA0ZTBmMzFiZmQzIiwiaHR0cHM6Ly9hcGkuc2FoaGEuYWkvY2xhaW1zL2V4dGVybmFsSWQiOiI3ODg0YTg2Ni00YWUxLTQ5NDUtOWZiYS1iMmI4ZDJiN2M1YTkiLCJodHRwczovL2FwaS5zYWhoYS5haS9jbGFpbXMvYWNjb3VudElkIjoiNDMxMTAxZjAtNzZkNC00MThmLWIzYTktNGMyOTlkZTAyODU1IiwiaHR0cHM6Ly9hcGkuc2FoaGEuYWkvY2xhaW1zL3NhaGhhQXBpU2NvcGUiOiJTYW5kYm94IiwiaHR0cHM6Ly9hcGkuc2FoaGEuYWkvY2xhaW1zL3JlZ2lvbiI6IlVTIiwiaHR0cHM6Ly9hcGkuc2FoaGEuYWkvY2xhaW1zL3JvbGUiOiJwcm9maWxlX293bmVyIiwiZXhwIjoxNzUwODE0ODA2LCJpc3MiOiJodHRwczovL3NhbmRib3gtYXBpLnNhaGhhLmFpIiwiYXVkIjoiaHR0cHM6Ly9zYW5kYm94LWFwaS5zYWhoYS5haSJ9.rRflQIEjtHqo0ehp0j2NhKJIx-M5AvxQYPW3kHzE2jI',
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('data', JSON.stringify(data, null, 2));
        setData(data);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  return { data };
}
