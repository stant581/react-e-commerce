// src/Pages/SearchResults.tsx
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { searchProducts, type Product } from "../service/api";

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResults: React.FC = () => {
  const query = useQuery().get("q") || "";
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      setLoading(true);
      const data = await searchProducts(query);
      setResults(data);
      setLoading(false);
    };
    fetchResults();
  }, [query]);

  return (
    <Container className="py-4">
      <h2>Search Results for "{query}"</h2>
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <Row>
          {results.map((product) => (
            <Col key={product.id} md={3} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={product.thumbnail}
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>{product.category}</Card.Text>
                  <Card.Text className="fw-bold">${product.price}</Card.Text>
                  <Link to={`/product/${product.id}`} className="btn btn-primary w-100">
                    View Details
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default SearchResults;
