import { type ReactNode } from "react";
import { CircleX } from "lucide-react";
import ReactDOM from "react-dom";
import { useModalStore } from "../../store/modalStore";

const modalSizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

function Backdrop() {
  return <div className="fixed inset-0 bg-black opacity-35 z-50" />;
}

function Content({
  children,
  modalSize = "md",
}: {
  children?: ReactNode;
  modalSize?: keyof typeof modalSizeClasses;
}) {
  const { closeModal } = useModalStore();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className={`relative bg-white rounded-md shadow-lg p-6 w-full ${modalSizeClasses[modalSize]} z-50`}
      >
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <CircleX className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
}

export default function Modal({
  children,
  modalSize = "md",
}: {
  children?: ReactNode;
  modalSize?: keyof typeof modalSizeClasses;
}) {
  const modals = document.getElementById("modals");

  if (!modals) return null;

  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, modals)}
      {ReactDOM.createPortal(
        <Content modalSize={modalSize}>{children}</Content>,
        modals,
      )}
    </>
  );
}
