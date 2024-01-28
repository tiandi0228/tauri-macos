import { AppMenuType } from '@/@types/app-menu';
import { Image, Tooltip } from '@arco-design/web-react';

interface DockCardProps {
    data: AppMenuType[];
    indicator: boolean;
    size: number;
    type: number;
    onOpenApp: (index: number, type: number, id?: number) => void;
    onMouseMove: (e: any) => void;
}

export const DockCard = ({
    data,
    indicator,
    size,
    type,
    onOpenApp,
    onMouseMove
}: DockCardProps) => {
    return (
        <>
            <div className="s-dock-divider"></div>
            <ul className="s-dock-items">
                {data.map((item: AppMenuType, index: number) => {
                    return (
                        <li
                            className="s-dock-item"
                            style={{ '--width': `${size}` }}
                            key={index}
                            onClick={() => onOpenApp(index, type, item.id)}
                            onMouseMove={onMouseMove}
                        >
                            <Tooltip mini content={item.title} className="-mt-6">
                                <Image
                                    style={{ '--width': `${size}` }}
                                    preview={false}
                                    src={item.icon}
                                />
                                {indicator && (
                                    <>
                                        {type === 1 && (
                                            <div
                                                className={`m-auto ${
                                                    item.isOpen ? 'w-1 h-1 bg-gray-400 mt-2' : ''
                                                } rounded-full`}
                                            ></div>
                                        )}
                                        {type !== 1 && (
                                            <div
                                                className={`m-auto w-1 h-1 bg-gray-400 mt-2 rounded-full`}
                                            ></div>
                                        )}
                                    </>
                                )}
                            </Tooltip>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};
