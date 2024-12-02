import { Nav } from "@/components/layout/Nav";
import { LoginBlock } from "@/components/LoginBlock";
import { MobileMenuModal } from "@/components/MobileMenuModal";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isModal, setIsModal] = useState(false);
  const handleOpenModal = () => {
    setIsModal((prevState) => !prevState);
  };

  return (
    <div className="border-b border-black py-3.5 pl-2.5 pr-3.5 sm:py-6 sm:px-8">
      <div className="mx-auto flex max-w-containe justify-between">
        <Link to="/" className="text-2xl focus-ring-brand">
          ComunApp
        </Link>
        <button
          className=" lg:hidden grid grid-cols-1 content-center gap-y-1"
          type="button"
          onClick={handleOpenModal}
        >
          <div className="w-[25px] h-1.5 bg-gray300 rounded-lg" />
          <div className="w-[25px] h-1.5 bg-gray300 rounded-lg" />
          <div className="w-[25px] h-1.5 bg-gray300 rounded-lg" />
        </button>
        <LoginBlock classNameBlock="hidden lg:block" />
      </div>

      {isModal && (
        <MobileMenuModal isOpen={isModal} onClose={handleOpenModal}>
          <Link
            to="/"
            className="py-3.5 pl-2.5 block border-b border-gray300 text-2xl sm:py-6"
          >
            ComunApp
          </Link>
          <Nav setCloseModal={setIsModal} />
          <LoginBlock classNameBlock="mx-5 xl:hidden border-t border-gray300 py-5" />
        </MobileMenuModal>
      )}
    </div>
  );
};

export default Header;
