export type IssueTypeKey =
  | 'potholes'
  | 'waterLogging'
  | 'poorLighting'
  | 'heavyTraffic'
  | 'brokenSignals'
  | 'damagedSignage'
  | 'roadBlockage'
  | 'missingLaneMarkings'
  | 'speedingZone'
  | 'accidentProneArea';

export interface IssueTypeConfig {
  key: IssueTypeKey;
  label: string;
}

export const ISSUE_TYPES: Record<IssueTypeKey, IssueTypeConfig> = {
  potholes: { key: 'potholes', label: 'Potholes' },
  waterLogging: { key: 'waterLogging', label: 'Water Logging' },
  poorLighting: { key: 'poorLighting', label: 'Poor Lighting' },
  heavyTraffic: { key: 'heavyTraffic', label: 'Heavy Traffic' },
  brokenSignals: { key: 'brokenSignals', label: 'Broken Traffic Signals' },
  damagedSignage: { key: 'damagedSignage', label: 'Damaged Road Signs' },
  roadBlockage: { key: 'roadBlockage', label: 'Road Blockage' },
  missingLaneMarkings: { key: 'missingLaneMarkings', label: 'Missing Lane Markings' },
  speedingZone: { key: 'speedingZone', label: 'Speeding Zone' },
  accidentProneArea: { key: 'accidentProneArea', label: 'Accident-Prone Area' },
}; 