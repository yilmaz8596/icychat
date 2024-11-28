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
