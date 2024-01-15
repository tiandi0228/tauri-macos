type ModalProps = {
    visible: boolean;
    children: any;
    width?: string;
};

function Modal(props: ModalProps) {
    const { visible, children, width } = props;
    return (
        <>
            {visible && (
                <div
                    className={`m-auto ${
                        width ? width : 'w-2/5'
                    } h-2/3 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-300 bg-opacity-95 shadow-md rounded-xl overflow-hidden`}
                >
                    {children}
                </div>
            )}
        </>
    );
}

export default Modal;
