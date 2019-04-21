import { AsyncStorage } from "react-native";
export class LocalStorage{
    static lang;
    async getLang(){
        const languageRestored= await AsyncStorage.getItem('language');
        if(languageRestored){
            LocalStorage.lang=languageRestored;
            console.log('lang: ' + LocalStorage.lang)
        }
        else{
            LocalStorage.lang='ar';
        }
    }
}