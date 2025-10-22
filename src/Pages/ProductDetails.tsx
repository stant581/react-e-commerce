import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image, Button, Form, Card } from "react-bootstrap";
import { fetchProductById, type Product } from "../service/api";
import { useCart } from "../Components/CartContext";
import { useAuth } from "../Components/AuthContext";

interface Review {
  id: number;
  username: string;
  comment: string;
  rating: number;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [editId, setEditId] = useState<number | null>(null);

  // Load product
  useEffect(() => {
    if (id) fetchProductById(parseInt(id)).then(setProduct);
  }, [id]);

  // Load reviews from localStorage
  useEffect(() => {
    if (id) {
      const saved = localStorage.getItem(`reviews_${id}`);
      if (saved) setReviews(JSON.parse(saved));
    }
  }, [id]);

  // Save reviews to localStorage
  useEffect(() => {
    if (id) {
      localStorage.setItem(`reviews_${id}`, JSON.stringify(reviews));
    }
  }, [reviews, id]);

  const handleAddOrEditReview = () => {
    if (!user) {
      alert("Please sign in to add a review.");
      return;
    }

    if (editId) {
      // Edit existing
      setReviews((prev) =>
        prev.map((r) =>
          r.id === editId ? { ...r, comment: newReview, rating: newRating } : r
        )
      );
      setEditId(null);
    } else {
      // Add new
      const newEntry: Review = {
        id: Date.now(),
        username: user.name || "Anonymous",
        comment: newReview,
        rating: newRating,
      };
      setReviews((prev) => [newEntry, ...prev]);
    }

    setNewReview("");
    setNewRating(5);
  };

  const handleDeleteReview = (id: number) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const handleEditClick = (r: Review) => {
    setNewReview(r.comment);
    setNewRating(r.rating);
    setEditId(r.id);
  };

  if (!product) return <Container>Loading...</Container>;

  return (
    <Container className="py-4">
      <Row>
        <Col md={6}>
          <Image src={product.thumbnail} fluid />
        </Col>
        <Col md={6}>
          <h2>{product.title}</h2>
          <p className="text-muted">{product.category}</p>
          <h4>₹{product.price}</h4>
          <p>{product.description}</p>
          <Button variant="primary" onClick={() => addToCart(product)}>
            Add to Cart
          </Button>
        </Col>
      </Row>

      {/* Reviews Section */}
      <hr className="my-4" />
      <h4>Customer Reviews</h4>

      {/* Add/Edit Review */}
      <Card className="p-3 mb-4 shadow-sm">
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Rating</Form.Label>
            <Form.Select
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r > 1 ? "s" : ""}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Write your review here..."
            />
          </Form.Group>
          <Button
            variant="success"
            onClick={handleAddOrEditReview}
            disabled={!newReview.trim()}
          >
            {editId ? "Update Review" : "Add Review"}
          </Button>
        </Form>
      </Card>

      {/* Review List */}
      {reviews.length === 0 && (
        <p className="text-muted">No reviews yet. Be the first to review!</p>
      )}

      {reviews.map((r) => (
        <Card key={r.id} className="mb-3 p-3 shadow-sm">
          <div className="d-flex justify-content-between align-items-center">
            <strong>{r.username}</strong>
            <span>{"⭐".repeat(r.rating)}</span>
          </div>
          <p className="mt-2">{r.comment}</p>
          {r.username === user?.name && (
            <div>
              <Button
                variant="outline-primary"
                size="sm"
                className="me-2"
                onClick={() => handleEditClick(r)}
              >
                Edit
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleDeleteReview(r.id)}
              >
                Delete
              </Button>
            </div>
          )}
        </Card>
      ))}
    </Container>
  );
};

export default ProductDetail;
