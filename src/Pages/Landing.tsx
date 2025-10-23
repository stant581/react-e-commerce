import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel, Container, Row, Col, Card, Button } from "react-bootstrap";
import { useAuth } from "../Components/AuthContext";
import { fetchProducts, type Product } from "../service/api";

const cardHoverStyle: React.CSSProperties = {
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  cursor: 'pointer',
};

interface AdBanner {
  id: string;
  image: string;
  alt_description: string;
}

const LandingPage: React.FC = () => {
  const { user } = useAuth();
  const [ads, setAds] = useState<AdBanner[]>([]);
  const [featured, setFeatured] = useState<Product[]>([]);

  // Fetch Ads from Unsplash
  useEffect(() => {
    // ... (rest of the useEffect for ads remains the same)
    const ACCESS_KEY = "YOUR_UNSPLASH_ACCESS_KEY"; // Replace with your Unsplash Access Key
    const fetchAds = async () => {
      try {
        const res = await fetch(
          `https://api.unsplash.com/photos/random?count=3&query=shopping+banner&client_id=${ACCESS_KEY}`)
        const data = await res.json();
        const mapped = data.map((img: any) => ({
          id: img.id,
          image: img.urls.regular,
          alt_description: img.alt_description || "Ad banner",
        }));
        setAds(mapped);
      } catch (err) {
        console.error("Failed to fetch ads", err);
      }
    };
    fetchAds();
  }, []);

  // Fetch featured products (first few from existing API)
  useEffect(() => {
    // ... (rest of the useEffect for featured products remains the same)
    const loadFeatured = async () => {
      const all = await fetchProducts();
      setFeatured(all.slice(0, 8)); 
    };
    loadFeatured();
  }, []);

  return (
    <Container className="py-4">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary">Welcome to Animesh Market! 👋</h1>
        {user ? (
          <div className="mt-3">
            <p>You are logged in as <strong>{user.name}</strong>.</p>
            <Link
              to="/dashboard"
              className="btn btn-info text-white mx-2"
            >
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div className="mt-3">
            <p>Please Sign Up or Sign In to explore our products.</p>
            <Link to="/signin" className="btn btn-outline-primary mx-2">
              Sign In
            </Link>
            <Link to="/signup" className="btn btn-outline-success mx-2">
              Sign Up
            </Link>
          </div>
        )}
      </div>

      {/* 🖼️ Ads Carousel */}
      {ads.length > 0 && (
        <Carousel className="mb-5">
          {ads.map((ad) => (
            <Carousel.Item key={ad.id}>
              <img
                className="d-block w-100 rounded"
                src={ad.image}
                alt={ad.alt_description}
                style={{ height: "200px", objectFit: "cover", width: "100%" }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      )}

      {/* 🌟 Featured Products Section */}
      <div className="text-center mb-4">
        <h2 className="fw-bold">Featured Products</h2>
      </div>

      <Row>
        {featured.map((product) => (
          <Col key={product.id} md={3} lg={3} className="mb-4">
            <Card
              className="h-100 shadow-sm"
              style={cardHoverStyle} // Apply the base style here
              // Add onMouseEnter and onMouseLeave handlers to manage the hover effect
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = '0 0.5rem 1rem rgba(0, 0, 0, 0.15), 0 0 10px rgba(0, 123, 255, 0.5)'; // Extra shadow for highlight
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 0.5rem 1rem rgba(0, 0, 0, 0.05)'; // Reset to original shadow or remove for a clean exit
              }}
            >
              <Card.Img
                variant="top"
                src={product.thumbnail}
                style={{ height: "auto", objectFit: "contain", width: "auto" }}
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text className="fw-bold">₹{product.price}</Card.Text>
                <Link to={`/product/${product.id}`}>
                  <Button variant="primary" className="w-100">
                    View Details
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default LandingPage;