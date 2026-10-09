import { useParams } from 'react-router-dom';
import ProductDetailsClient from './ProductDetailsClient';

export default function ProductDetailsPage() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) return null;

  return (
    <ProductDetailsClient slug={slug} />
  );
}
