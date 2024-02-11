import Button from '@/ui/Button';
import Modal from '@/ui/Modal';

function ScheduleModal({ buttonRef, modalName, children }) {
    return (
        <Modal>
            <Modal.Open opens={modalName}>
                <Button style={{ display: 'none' }} ref={buttonRef}>Open Modal</Button>
            </Modal.Open>
            <Modal.Window name={modalName}>
                {children}
            </Modal.Window>
        </Modal>
    );
}

export default ScheduleModal;
