import { create } from "zustand";

type ModalType = "add-invoice-modal" | "";
type ModalStoreI = {
  modalType: ModalType;
  openModal: (modalType: ModalType) => void;
  closeModal: () => void;
  isOpen: boolean;
};

export const useModalStore = create<ModalStoreI>((set) => ({
  modalType: "",
  isOpen: false,
  openModal: (modalType) => {
    set(() => ({
      modalType: modalType,
      isOpen: true,
    }));
  },
  closeModal: () => {
    set(() => ({
      isOpen: false,
      modalType: "",
    }));
  },
}));
