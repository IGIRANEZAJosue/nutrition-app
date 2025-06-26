import { useEffect, useState } from 'react';

import { Biomarker } from '~/utils/api';

export default function useBiomarkers() {
  const [data, setData] = useState<Biomarker[]>([]);

  useEffect(() => {
    fetch(
      'https://sandbox-api.sahha.ai/api/v1/profile/biomarker/7884a866-4ae1-4945-9fba-b2b8d2b7c5a9?categories=activity&categories=sleep&endDateTime=2025-06-26&startDateTime=2025-06-20&types=steps&types=floors_climbed&types=active_hours&types=active_duration&types=activity_low_intensity_duration&types=activity_medium_intensity_duration&types=activity_high_intensity_duration&types=activity_sedentary_duration&types=active_energy_burned&types=total_energy_burned&types=sleep_start_time&types=sleep_end_time&types=sleep_duration&types=sleep_debt&types=sleep_interruptions&types=sleep_in_bed_duration&types=sleep_awake_duration&types=sleep_light_duration&types=sleep_rem_duration&types=sleep_deep_duration&types=sleep_regularity&types=sleep_latency&types=sleep_efficiency',
      {
        method: 'GET',
        headers: {
          Authorization:
            'account eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2FwaS5zYWhoYS5haS9jbGFpbXMvYWNjb3VudElkIjoiNDMxMTAxZjAtNzZkNC00MThmLWIzYTktNGMyOTlkZTAyODU1IiwiaHR0cHM6Ly9hcGkuc2FoaGEuYWkvY2xhaW1zL2FkbWluIjoiVHJ1ZSIsImh0dHBzOi8vYXBpLnNhaGhhLmFpL2NsYWltcy9hY2NvdW50IjoiVHJ1ZSIsImh0dHBzOi8vYXBpLnNhaGhhLmFpL2NsYWltcy9zYWhoYUFwaVNjb3BlIjoic2FuZGJveCIsImh0dHBzOi8vYXBpLnNhaGhhLmFpL2NsYWltcy9yZWdpb24iOiJVUyIsImV4cCI6MTc1Mjk2NzY1NCwiaXNzIjoiaHR0cHM6Ly9zYWhoYS1wcm9kdWN0aW9uLmF1LmF1dGgwLmNvbS8iLCJhdWQiOiJodHRwczovL3NhaGhhLXByb2R1Y3Rpb24uYXUuYXV0aDAuY29tL2FwaS92Mi8ifQ.QslE2krUVJhDvXqoYDljxo0KvM72dL1YSzoGEDC-Eps',
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  return { data };
}
