import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartProduct = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImg;
  quantity: number;
  price: number;
};

type SelectedImg = {
  color: string;
  colorCode: string;
  image: string;
};

type CartStore = {
  cartProducts: CartProduct[];
  cartTotalAmount: number;
  addToCart: (product: CartProduct) => void;
  removeFromCart: (product: CartProduct) => void;
  handleClearCart: () => void;
  handleQtyIncrease: (product: CartProduct) => void;
  handleQtyDecrease: (product: CartProduct) => void;
};

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      cartProducts: [],
      cartTotalAmount: 0,
      addToCart: (product) => {
        const currentProducts = get().cartProducts;
        const existingProduct = currentProducts.find(item => item.id === product.id);

        if (existingProduct) {
          const updatedProducts = currentProducts.map(item => 
            item.id === product.id 
              ? {...item, quantity: item.quantity + 1}
              : item
          );
          set({ cartProducts: updatedProducts });
        } else {
          set({ cartProducts: [...currentProducts, {...product, quantity: 1}] });
        }
      },
      removeFromCart: (product) => {
        const currentProducts = get().cartProducts;
        const updatedProducts = currentProducts.filter(item => item.id !== product.id);
        set({ cartProducts: updatedProducts });
      },
      handleClearCart: () => {
        set({ cartProducts: [] });
      },
      handleQtyIncrease: (product) => {
        const currentProducts = get().cartProducts;
        const updatedProducts = currentProducts.map(item => 
          item.id === product.id 
            ? {...item, quantity: item.quantity + 1}
            : item
        );
        set({ cartProducts: updatedProducts });
      },
      handleQtyDecrease: (product) => {
        const currentProducts = get().cartProducts;
        const updatedProducts = currentProducts.map(item => 
          item.id === product.id && item.quantity > 1
            ? {...item, quantity: item.quantity - 1}
            : item
        );
        set({ cartProducts: updatedProducts });
      }
    }),
    {
      name: 'cart-storage'
    }
  )
);
