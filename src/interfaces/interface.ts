export interface Parameters {
  [parameterName: string]: string;
}

export interface CallTree {
  tree: Files
  functions: {
    [functionId: string]: FunctionInterface
  }
}


export interface Files {
  id?: string;
  children: {
    [filename: string]: Files | ClassInterface;
  }
  type?: string;
}

export interface ClassInterface {
  functions: {
    [functionName: string]: LightFunctionInterface
  }
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  id: string;
  type: string;
}

export interface FileInterface {
  fileName: string;
  classes: {
    [classname: string]: ClassInterface
  };
  nrOfFunctions: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export interface LightFunctionInterface {
  id: string;
}

export interface FunctionInterface {
  name: string;
  id?: string;
  className?: string;
  file?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  parameters?: Parameters;
  returnType?: string;
  recursive?: string;
  inComing?: number;
  outGoing?: number;
  numberOfCalls?: number;
  parents: string[];
  children: string[];
};
