import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { bindActionCreators } from 'redux';
import * as CartActions from '../../store/modules/cart/actions';
import {
  MdRemoveCircleOutline, 
  MdAddCircleOutline, 
  MdDelete
} from 'react-icons/md';
import { Container, ProductTable, Total } from './styles';
import { formatPrice } from '../../util/format';

export default function Cart() {
  
  //produtos do carrinho
  const cart = useSelector(state => 
    state.cart.map(product => ({
      ...product,
      subtotal:formatPrice(product.price * product.amount),
    }))
  );

  //retorna o valor total
  const total = useSelector(state => 
    formatPrice(state.cart.reduce((total, product) => {
      return total + product.price * product.amount
    },0))
  );

  const dispatch = useDispatch();

  //função que aumenta a quantidade
  function increment(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  };
  
  //função que diminui a quantidade
  function decrement(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  };
  
  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {
            cart.map(product => (
              <tr>
                <td>
                  <img 
                    src={product.image}
                    alt={product.title}
                  />
                </td>
                <td>
                  <strong>{product.title}</strong>
                  <span>{product.priceFormatted}</span>
                </td>
                <td>
                  <div>
                    <button type="button" onClick={() => decrement(product)}>
                      <MdRemoveCircleOutline size={20} color="#7159c1"/>
                    </button>
                    <input type="number" readOnly value={product.amount} />
                    <button type="button" onClick={() => increment(product)}>
                      <MdAddCircleOutline size={20} color="#7159c1"/>
                    </button>
                  </div>
                </td>
                <td>
                  <strong>{product.subtotal}</strong>
                </td>
                <td>
                  <button 
                    type="button" 
                    onClick={() => dispatch(CartActions.removeFromCart(product.id))}>
                    <MdDelete size={20} color="#7159c1"/>
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>

      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}
