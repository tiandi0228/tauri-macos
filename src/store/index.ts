import { atom } from 'recoil';
import themeConfig from '@/config/theme';
import { themeType } from '@/@types/theme';
import { localStorage } from '@/utils';
import { userType } from '@/@types/user';

export interface StateType {
    // token
    token: "",
    // 用户信息
    userInfo: userType | null,
    // 语言
    language: "",
    themeConfig: themeType
}

const initialState: StateType = {
    token: '',
    userInfo: {
        username: '',
        password: ''
    },
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