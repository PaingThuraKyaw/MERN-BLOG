export interface postProps {
  post: {
    _id: string;
    title: string;
    description: string;
    author: string;
    file: File;
    createAt: string;
    updateAt: string;
  }[];
  totalPost: number;
}

export interface postProp {
  _id: string;
  title: string;
  description: string;
  author: string;
  file: File;
  createAt: string;
  updateAt: string;
}[]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyPresentValue = any;

export interface FormDataProp {
  title: string;
  description: string;
  // file: File | null;
  file?: AnyPresentValue | undefined;
}

export interface FormUpdateData {
  _id: string;
  title: string;
  description: string;
  file?: AnyPresentValue | undefined;
}
