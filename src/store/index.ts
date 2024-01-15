import { atom } from 'recoil';
import themeConfig from '@/config/theme';
import { themeType } from '@/@types/theme';
import { localStorage } from '@/utils';

export interface StateType {
    // token
    token: "",
    // 用户信息
    userInfo: "",
    // 语言
    language: "",
    themeConfig: themeType
}

const initialState: StateType = {
    token: '',
    userInfo: '',
    language: '',
    themeConfig: {
        primaryBg: themeConfig.primaryBg,
        isDark: themeConfig.isDark
    }
};

export const globalState = atom({
    key: 'globalState',
    default: initialState,
    effects_UNSTABLE: [
        localStorage('global_state')
    ]
});