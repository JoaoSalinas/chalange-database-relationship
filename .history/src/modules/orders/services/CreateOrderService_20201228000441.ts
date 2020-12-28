import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customerExists = await this.customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Could not find any customer with this id.');
    }

    const productsExists = await this.productsRepository.findAllById({
      products,
    });

    if (!productsExists.length) {
      throw new AppError('Could not find a product with this id(s)');
    }

    const existentProductsIds = productsExists.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existentProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0]}`,
      );
    }

    const findProductsWithNoQuantityAvailable = products.filter(
      product =>
        existentProducts.filter(prod => prod.id === product.id)[0].quantity <
        product.quantity,
    );

    if (findProductsWithNoQuantityAvailable.length) {
      throw new AppError(`Quantity is not available for this product`);
    }

    const serealizedProducts = products.map(product => ({
      id: product.id,
      quantity: product.quantity,
      price: existentProducts.filter(prod => prod.id === product.id)[0].price,
    }));
  }
}

export default CreateOrderService;
