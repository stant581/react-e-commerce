import React from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useCart } from "../Components/CartContext";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart, total } = useCart();

  if (cart.length === 0) return <Container className="py-4">Your cart is empty.</Container>;

  return (
    <Container className="py-4">
      <h2>Your Cart</h2>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price * item.quantity}</td>
              <td>
                <Button variant="outline-danger" onClick={() => removeFromCart(item.id)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h4>Total: ₹{total}</h4>
      <Button variant="success" onClick={() => { clearCart(); alert("Checkout complete!"); }}>
        Checkout
      </Button>
    </Container>
  );
};

export default CartPage;
