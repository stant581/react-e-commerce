import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchProducts, type Product } from "../service/api";
import { useCart } from "../Components/CartContext";

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center fw-bold">Our Products</h2>

      <Row className="g-4">
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100 shadow-sm border-0 hover-card">
              <Card.Img
                variant="top"
                src={product.thumbnail}
                style={{
                  height: "200px",
                  objectFit: "cover",
                  borderTopLeftRadius: "0.5rem",
                  borderTopRightRadius: "0.5rem",
                }}
              />
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title className="fs-6 text-truncate">{product.title}</Card.Title>
                  <Card.Text className="text-muted mb-2">{product.category}</Card.Text>
                  <Card.Text className="fw-bold fs-5">₹{product.price}</Card.Text>
                </div>
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="flex-grow-1"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </Button>
                  <Link to={`/product/${product.id}`} className="flex-grow-1">
                    <Button variant="primary" size="sm" className="w-100">
                      View
                    </Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Dashboard;
