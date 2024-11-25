export const bootstrapColors = {
    danger: '#dc3545',  // Bootstrap "danger" color
    primary: '#007bff', // Bootstrap "primary" color which is a shade of blue
    info: '#17a2b8',    // Bootstrap "info" color
    success: '#28a745', // Bootstrap "success" color
    warning: '#ffc107', // Bootstrap "warning" color
};


// bootstrapStyles.js
import { StyleSheet } from 'react-native';
const colors = {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    light: '#f8f9fa',
    dark: '#343a40',
    white: '#ffffff',
    black: '#000000',
    // Add more colors as needed
};


export const bootstrapStyles = StyleSheet.create({
    textPrimary: {
        color: colors.primary,
    },
    textDanger: {
        color: colors.danger,
    },
    textSuccess: {
        color: colors.success,
    },
    textInfo: {
        color: colors.info,
    },
    textWarning: {
        color: colors.warning,
    },
    textLight: {
        color: colors.light,
    },
    textDark: {
        color: colors.dark,
    },
    bgPrimary: {
        backgroundColor: colors.primary,
    },
    bgDanger: {
        backgroundColor: colors.danger,
    },
    bgSuccess: {
        backgroundColor: colors.success,
    },
    bgInfo: {
        backgroundColor: colors.info,
    },
    bgWarning: {
        backgroundColor: colors.warning,
    },
    bgLight: {
        backgroundColor: colors.light,
    },
    bgDark: {
        backgroundColor: colors.dark,
    },
    btn: {
        padding: 10,
        borderRadius: 5,
    },
    btnPrimary: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 5,
    },
    btnDanger: {
        backgroundColor: colors.danger,
        padding: 10,
        borderRadius: 5,
    },
    btnSuccess: {
        backgroundColor: colors.success,
        padding: 10,
        borderRadius: 5,
    },
    btnOutline: {
        borderWidth: 1,
        backgroundColor: 'transparent',
    },
    btnOutlinePrimary: {
        borderWidth: 1,
        borderColor: colors.primary,
        color: colors.primary,
    },
    btnOutlineDanger: {
        borderWidth: 1,
        borderColor: colors.danger,
        color: colors.danger,
    },
    btnOutlineSuccess: {
        borderWidth: 1,
        borderColor: colors.success,
        color: colors.success,
    },
    btnOutlineInfo: {
        borderWidth: 1,
        borderColor: colors.info,
        color: colors.info,
    },
    btnOutlineWarning: {
        borderWidth: 1,
        borderColor: colors.warning,
        color: colors.warning,
    },
    btnOutlineLight: {
        borderWidth: 1,
        borderColor: colors.light,
        color: colors.dark, // dark text for light backgrounds
    },
    btnOutlineDark: {
        borderWidth: 1,
        borderColor: colors.dark,
        color: colors.light, // light text for dark backgrounds
    },
    // Add other Bootstrap-like styles here...
});



