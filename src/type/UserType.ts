export interface UserInformation {
  user: null | {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
}

export interface CurrentUserInformationInDatabase {
  uid: string,
  ID: string
}