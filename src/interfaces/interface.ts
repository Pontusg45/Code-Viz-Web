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
  [filename: string]: Files | ClassInterface;
};

export interface ClassInterface {
  name: string;
  class: {
    id: string;
    functions: {
      [functionName: string]: LightFunctionInterface
    }
    fileName: string;
    name: string;
  }
  x?: number;
  y?: number;
  width?: number;
  height?: number;
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
