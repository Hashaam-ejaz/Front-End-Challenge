interface eventType {
  relevance: number;
  id: string;
  title: string;
  alternate_titles: string[];
  description: string;
  category: string;
  labels: string[];
  rank: number;
  local_rank: number;
  phq_attendance: number;
  entities: {
    entity_id: string;
    name: string;
    type: string;
    formatted_address: string;
  }[];
  duration: number;
  start: string;
  start_local: string;
  end: string;
  end_local: string;
  predicted_end: string;
  predicted_end_local: string;
  updated: string;
  first_seen: string;
  timezone: string;
  location: [number, number];
  geo: {
    geometry: {
      coordinates: [number, number];
      type: string;
    };
    placekey: string;
    address: {
      country_code: string;
      formatted_address: string;
      postcode: string;
      locality: string;
      region: string;
    };
  };
  impact_patterns: {
    vertical: string;
    impact_type: string;
    impacts: {
      date_local: string;
      value: number;
      position: string;
    }[];
  }[];
  scope: string;
  country: string;
  place_hierarchies: string[][];
  state: string;
  brand_safe: boolean;
  private: boolean;
  predicted_event_spend: number;
  predicted_event_spend_industries: {
    accommodation: number;
    hospitality: number;
    transportation: number;
  };
  phq_labels: {
    label: string;
    weight: number;
  }[];
}

export default eventType;
