import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductById, type Product } from "../service/api";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) fetchProductById(Number(id)).then(setProduct);
  }, [id]);

  if (!product) return <div className="text-center mt-5">Loading...</div>;

  return (
    <Container className="py-5">
      <Row>
        <Col md={6}>
          <Image src={product.thumbnail} fluid rounded />
        </Col>
        <Col md={6}>
          <h2>{product.title}</h2>
          <p className="text-muted">{product.category}</p>
          <p>{product.description}</p>
          <h4>${product.price}</h4>
          <p>⭐ {product.rating}</p>
          <Button variant="success" className="me-2">Add to Cart</Button>
          <Link to="/dashboard">
            <Button variant="secondary">Back to Dashboard</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
