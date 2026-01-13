export interface MarksData {
  Year: string;
  Class: string;
  Subject: string;
  Municipality: string;
  OO: string;
  Login: string;
  Participants: number;
  Mark2: number;
  Mark3: number;
  Mark4: number;
  Mark5: number;
}

export interface ScoreData {
  Year: string;
  Class: string;
  Subject: string;
  Municipality: string;
  OO: string;
  Login: string;
  Point: number;
  Percent: number;
}

export interface BiasData {
  Year: string;
  Municipality: string;
  OO: string;
  Login: string;
  Marker: string;
  MarkerCount: number;
}

export type FilterState = {
  year: string;
  classLevel: string;
  subject: string;
  municipality: string;
  oo: string;
};

export type Stats = {
  schoolCount: number;
  participantCount: number;
  successRate: number;
  qualityRate: number;
};
