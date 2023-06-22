import { createContext, useContext, useEffect, useState } from "react";

type LanguageType = {
    title: string
    value: string
}

type DataContextType = {
    languages: LanguageType[],
    language?: string;
    setLanguage: (value: string) => void;
    choose: (val1: any, val2: any) => any;
    content: Content
};

const DataContext = createContext<DataContextType>({
    languages: [],
    language: undefined,
    setLanguage: () => { },
    choose: () => { },
    content: {}
});

type DataProviderProps = {
    children: React.ReactNode;
};

export const DataProvider = ({ children }: DataProviderProps) => {
    const [language, setLanguage] = useState<string>('en');

    useEffect(() => {
        const savelanguage: string | null = localStorage.getItem("language") || 'en';
        setLanguage(savelanguage);
    }, []);


    useEffect(() => {
        localStorage.setItem("language", language);
    }, [language]);

    const choose = (val1: any, val2: any) => {
        return language === "en" ? val1 : val2;
    }

    const languages: LanguageType[] = [
        {
            title: "English",
            value: "en"
        },
        {
            title: "اللغة العربية",
            value: "ar"
        }
    ]

    const content: Content = {
        nav: {
            home: choose("Home","الصفحة الرئيسية"),
            series: choose("Series","مسلسل"),
            films: choose("Films","أفلام"),
            newAndPopular: choose("New & Popular","جديد وشعبي"),
            myList: choose("My List","قائمتي"),
            browseByLanguages: choose("Browse By Languages","تصفح حسب اللغات"),
        },
        signIn: choose("Sign in", "تسجيل الدخول"),
        email: choose("email", "بريد إلكتروني"),
        username: choose("username", "اسم المستخدم"),
        password: choose("password", "كلمة المرور"),
        login: choose("login", "تسجيل الدخول"),
        register: choose("register", "يسجل"),
        firstTime: choose("First time using Al-amer?", "أول مرة تستخدم فيها العامر؟"),
        CreateAccount: choose("Create an account", "إنشاء حساب"),
        alreadyHave: choose("Already have an account?", "هل لديك حساب؟"),
        play: choose("play","شغل"),
        moreInfo: choose("More info","معلومات اكثر")
        
}


return (
    <DataContext.Provider value={{ language, setLanguage, choose, languages, content }}>
        {children}
    </DataContext.Provider>
);
};

export const useData = (): DataContextType => useContext(DataContext);
