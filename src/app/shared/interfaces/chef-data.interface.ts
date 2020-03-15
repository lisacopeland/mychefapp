// NodesResponse is used for the `/nodes` endpoint response
export interface NodesResponseInterface  {
  Nodes: NodeInterface[];
  Total: number;
}

export interface NodeInterface {
  ID: string;
  Name: string;
  Platform: PlatformInterface;
  LastScan: LastRunInterface;
  LastClientRun: LastRunInterface;
  Tags: KvInterface[];
}

export interface KvInterface {
  Key: string;
  Value: string;
}

export interface PlatformInterface {
  Name: string;
  Release: string;
}
export interface LastRunInterface {
  Time: Date;
  Status: 'passed' | 'failed' | 'skipped';
  PenultimateStatus: 'passed' | 'failed' | 'skipped';
}

export interface NodesRequestInterface {
  Filters: KvInterface[];
}
