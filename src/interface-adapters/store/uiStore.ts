import { create } from 'zustand';

interface UIState {
    isProductDetailExpanded: boolean;
    toggleProductDetail: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    isProductDetailExpanded: false,
    toggleProductDetail: () => set((state) => ({ isProductDetailExpanded: !state.isProductDetailExpanded })),
}));