export interface Message {
  _id?: string;
  chatClassName?: string;
  profilePic?: string;
  message?: {
    message: string;
    sender?: string;
  };
  bubbleBgColor?: string;
  shakeClass?: string;
  formattedTime?: string;
}

export interface RegisterProps {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

// In your types.ts file
export interface User {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  gender: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    _id: string;
    fullName: string;
    username: string;
    email: string;
    gender: string;
  };
}
