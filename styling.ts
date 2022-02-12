import { StyleSheet } from "react-native";

export const hamburger = { uri: 'https://specialspectacleimg.blob.core.windows.net/continentalimgs/hamburgerIcon.png' };
export const gold = { uri: 'https://i.imgur.com/xSSnFS2.gif' };
export const backgroundContinental = { uri: "https://specialspectacleimg.blob.core.windows.net/continentalimgs/backgroundContinental.jpg" };
export const styleBackground = StyleSheet.create({
    image: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    }
});

export const paddingColor = 'rgba(255, 250, 250, 0.1)';
export const mainBackgroundColor = 'rgba(255, 240, 200, 0.75)';
export const borderColor = 'rgba(255, 200, 50, 0.9)';
export const textColor = '#000';

export const loginBtn = borderColor;
export const loginBtnActive = 'rgba(200,150,20,0.4)';