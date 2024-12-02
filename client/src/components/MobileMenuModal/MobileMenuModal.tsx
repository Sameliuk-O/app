import { IMobileMenuModal } from "@/types/IMobileMenuModal.ts";

const MobileMenuModal = (props: IMobileMenuModal) => {
  const { isOpen, onClose, children } = props;

  const handleClose = () => {
    const modalElement = document.getElementById("modal-container");
    if (modalElement) {
      modalElement.classList.remove("animate-slideIn");
      modalElement.classList.add("animate-slideOut");
      setTimeout(() => {
        onClose(false);
      }, 1000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        id="modal-container"
        className={`relative w-full h-full bg-white overflow-auto transform transition-transform duration-[2000ms] ease-in-out animate-slideIn`}
      >
        <button
          className="absolute top-0 right-0 m-3 text-gray500 text-4xl hover:text-blackMain"
          onClick={handleClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default MobileMenuModal;
