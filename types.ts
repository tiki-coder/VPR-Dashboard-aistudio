
export interface MarksData {
  Year: number;
  Grade: string;
  Subject: string;
  Municipality: string;
  Login: string;
  OO: string;
  Participants: number;
  Mark2: number;
  Mark3: number;
  Mark4: number;
  Mark5: number;
}

export interface ScoreData {
  Year: number;
  Grade: string;
  Subject: string;
  Municipality: string;
  Login: string;
  OO: string;
  Participants: number;
  Scores: Record<number, number>; // Map of point: percentage
}

export interface BiasData {
  Year: number;
  Login: string;
  Municipality: string;
  OO: string;
  Markers: string[];
  MarkerCount: number;
}

export interface FilterState {
  year: string;
  grade: string;
  subject: string;
  municipality: string;
  oo: string;
}

export interface StatsSummary {
  schoolCount: number;
  participantCount: number;
  successRate: number; // 3+4+5
  qualityRate: number; // 4+5
}
