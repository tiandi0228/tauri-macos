import { atom } from "recoil";
import {localStorage} from '@/utils';
import { DockType } from "@/@types/dock";

const initialState: DockType = {
    size: 1,
    zoom: 1,
    autoHide: true,
    indicator: true
};

export const DockState = atom({
    key: 'dockState',
    default: initialState,
    effects_UNSTABLE: [
        localStorage('dock_state')
    ]
});