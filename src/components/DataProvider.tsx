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

    const content = {
        signIn: choose("Sign in", "تسجيل الدخول"),
        email: choose("email", "بريد إلكتروني"),
        username: choose("username", "اسم المستخدم"),
        password: choose("password", "كلمة المرور"),
        login: choose("login", "تسجيل الدخول"),
        register: choose("register", "يسجل"),
        firstTime: choose("First time using Al-amer?", "أول مرة تستخدم فيها العامر؟"),
        CreateAccount: choose("Create an account", "إنشاء حساب"),
        alreadyHave: choose("Already have an account?", "هل لديك حساب؟"),
}


return (
    <DataContext.Provider value={{ language, setLanguage, choose, languages, content }}>
        {children}
    </DataContext.Provider>
);
};

export const useData = (): DataContextType => useContext(DataContext);
