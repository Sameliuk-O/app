import { IModal } from "@/types/IModal.ts";
import classNames from "classnames";
const Modal = ({ isOpen, onClose, children }: IModal) => {
  return (
    <div
      className={classNames(
        "fixed inset-0 flex items-center justify-center z-50",
        { hidden: !isOpen },
      )}
    >
      <div
        className="fixed inset-0 bg-gray700 opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-gray25 p-6 rounded-md z-10 max-w-1/3 shadow-lg">
        <button
          className="absolute top-0 right-0 mx-2 my-1 text-gray500 text-4xl hover:text-blackMain"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
