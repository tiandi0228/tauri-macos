import { DockState } from '@/store/dock';
import { Slider, Switch } from '@arco-design/web-react';
import { useRecoilState } from 'recoil';

function Dock() {
    const [dock, setDock] = useRecoilState(DockState);

    return (
        <div className='pt-4'>
            <div className='border-gray-200 bg-gray-100 rounded-md py-4 flex items-center'>
                <div className='flex-1'>
                    <div className='pl-3 pb-1'>大小</div>
                    <Slider
                        defaultValue={dock.size}
                        min={1}
                        max={2}
                        step={0.1}
                        showTicks={false}
                        marks={{
                            1: '小',
                            2: '大'
                        }}
                        onChange={(e: number | number[]) => {
                            setDock(old => ({ ...old, size: Number(e) }));
                        }}
                        style={{
                            width: '100%',
                            verticalAlign: 'middle'
                        }}
                    />
                </div>
                <div className='flex-1'>
                    <div className='pl-3 pb-1'>放大</div>
                    <Slider
                        defaultValue={dock.zoom}
                        min={1}
                        max={1.5}
                        step={0.1}
                        showTicks={false}
                        marks={{
                            1: '小',
                            1.5: '大'
                        }}
                        onChange={(e: number | number[]) => {
                            setDock(old => ({ ...old, zoom: Number(e) }));
                        }}
                        style={{
                            width: '100%',
                            verticalAlign: 'middle'
                        }}
                    />
                </div>
            </div>
            <div className='border-gray-200 bg-gray-100 rounded-md px-2 mt-2'>
                <div className='w-full h-10 flex items-center justify-between border-b border-gray-200'>
                    <span>自动隐藏和显示程序坞</span>
                    <Switch checked={dock.autoHide} className={dock.autoHide ? 'bg-blue-400' : 'bg-gray-300'}
                            onChange={(e: boolean) => setDock(old => ({ ...old, autoHide: e }))} />
                </div>
                <div className='w-full h-10 flex items-center justify-between'>
                    <span>为打开的应用程序显示指示灯</span>
                    <Switch checked={dock.indicator} className={dock.indicator ? 'bg-blue-400' : 'bg-gray-300'}
                            onChange={(e: boolean) => setDock(old => ({ ...old, indicator: e }))} />
                </div>
            </div>
        </div>
    );
}

export default Dock;
