interface ContentValue {
  en: string;
  ar: string;
}

interface Content {
  signIn?: string;
  email?: string;
  username?: string;
  password?: string;
  login?: string;
  register?: string;
  firstTime?: string;
  CreateAccount?: string;
  alreadyHave?: string;
  nav?: {
    home?: string;
    series?: string;
    films?: string;
    newAndPopular?: string;
    myList?: string;
    browseByLanguages?: string;
  };
}
