export interface Message {
  _id: string;
  message: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
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

export interface ConversationResponse {
  _id: string;
  participants: {
    _id: string;
    fullName: string;
    username: string;
    email: string;
    gender: string;
    profilePic: string;
  }[];
  messages: {
    _id: string;
    message: string;
    senderId: string;
    receiverId: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  otherParticipant: OtherParticipant;
}

export interface SelectedConversation {
  _id: string;
  profilePic: string;
  fullName: string;
  messages: Message[];
}

export interface OtherParticipant {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  gender: string;
  profilePic: string;
}
