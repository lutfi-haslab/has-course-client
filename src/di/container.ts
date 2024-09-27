import { productModule } from './modules/productModule';
import { userModule } from './modules/userModule';

export const container = {
  user: userModule,
  product: productModule
};