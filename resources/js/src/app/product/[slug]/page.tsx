import { fetchProductDetails } from '@/lib/api';
import { Link } from 'react-router-dom';
;
import { useNavigate, useLocation } from 'react-router-dom';
import AddToCartButton from '@/components/AddToCartButton';
import ProductGallery from '@/components/product/ProductGallery';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        if (slug) {
          const data = await fetchProductDetails(slug);
          setProduct(data);
        }
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product Not Found</div>;
  }

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || (process.env.NEXT_PUBLIC_BASE_URL || 'https://api.cellx.com.bd');
  const relatedProducts = product.related_products || [];

  return (
    <div className="min-h-screen py-12">
      {/* JSON-LD Schema */}
      {product.seo?.json_schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: product.seo.json_schema }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-600 dark:text-gray-400 mb-8 overflow-x-auto whitespace-nowrap" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-4 h-4 mx-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                <Link to="/shop" className="hover:text-orange-500 transition-colors">Shop</Link>
              </div>
            </li>
            {product.category && (
              <li>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mx-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                  <Link to={`/categories/${product.category.slug}`} className="hover:text-orange-500 transition-colors">{product.category.name}</Link>
                </div>
              </li>
            )}
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-4 h-4 mx-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                <span className="text-gray-800 dark:text-gray-200 font-medium ml-1 md:ml-2">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="bg-white dark:bg-[#111] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            
            {/* Product Images */}
            <div className="lg:w-1/2 p-8 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-[#1a1a1a]/50 flex flex-col justify-center items-center relative">
              {product.discount_price && (
                <div className="absolute top-8 left-8 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10 shadow-sm">
                  SALE
                </div>
              )}
              {product.type === 'used' && (
                <div className="absolute top-8 right-8 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10 shadow-sm">
                  PRE-OWNED
                </div>
              )}
              <ProductGallery images={product.images || []} productName={product.name} />
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2 p-8 lg:p-12">
              <div className="mb-2">
                <Link to={`/brands/${product.brand?.slug}`} className="text-orange-500 font-semibold tracking-wider uppercase text-sm hover:underline">
                  {product.brand?.name}
                </Link>
                {product.category && (
                  <span className="text-gray-500 text-sm"> • <Link to={`/categories/${product.category.slug}`} className="hover:underline text-gray-600 dark:text-gray-400">{product.category.name}</Link></span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-baseline gap-2">
                  {product.discount_price ? (
                    <>
                      <span className="text-4xl font-extrabold text-gray-900 dark:text-white">৳{product.discount_price}</span>
                      <span className="text-lg text-gray-500 line-through">৳{product.price}</span>
                    </>
                  ) : (
                    <span className="text-4xl font-extrabold text-gray-900 dark:text-white">৳{product.price}</span>
                  )}
                </div>
                <div className="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>
                <div>
                  {product.stock > 0 ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      In Stock ({product.stock})
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/60 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 text-lg mb-8 leading-relaxed">
                {product.short_description || "No short description available."}
              </p>

              {/* Variants Selection (if any) */}
              {product.variants && product.variants.length > 0 && (
                 <div className="mb-8">
                   <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Available Options</h3>
                   <div className="flex flex-wrap gap-2">
                     {/* Just displaying available variants for now, a full selector needs a client component */}
                     {product.variants.map((v: any) => (
                       <div key={v.id} className="border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50">
                          {Object.entries(v.attributes || {}).map(([key, val]) => `${key}: ${val}`).join(' | ')}
                          {v.additional_price > 0 && <span className="ml-2 font-medium text-orange-500">(+${v.additional_price})</span>}
                       </div>
                     ))}
                   </div>
                 </div>
              )}

              {/* Action Buttons */}
              <AddToCartButton product={product} />

              {/* SKU & Extra Info */}
              <div className="text-sm text-gray-500 space-y-2 mt-6">
                <p><strong className="text-gray-700 dark:text-gray-300 font-medium">SKU:</strong> {product.sku}</p>
                <p><strong className="text-gray-700 dark:text-gray-300 font-medium">Condition:</strong> <span className="capitalize">{product.type}</span></p>
              </div>

            </div>
          </div>
          
          {/* Detailed Info Tabs */}
          <div className="bg-white dark:bg-[#111] border-t border-gray-200 dark:border-gray-800 px-8 py-10">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Product Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="prose prose-invert max-w-none text-gray-600 dark:text-gray-400">
                {product.long_description ? (
                  <div dangerouslySetInnerHTML={{ __html: product.long_description }} />
                ) : (
                  <p>No detailed description provided for this product.</p>
                )}
              </div>
              
              {/* Specifications */}
              {product.attributes && Object.keys(product.attributes).length > 0 && (
                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Specifications</h4>
                  <div className="bg-gray-100 dark:bg-[#1a1a1a] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
                    <table className="min-w-full divide-y divide-gray-800">
                      <tbody className="divide-y divide-gray-800">
                        {Object.entries(product.attributes).map(([key, value]) => (
                          <tr key={key}>
                            <td className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-800/30 w-1/3">{key}</td>
                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{String(value)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Used Phone Details if applicable */}
            {product.type === 'used' && product.usedPhoneDetails && (
              <div className="mt-10 bg-orange-950/20 rounded-xl p-6 border border-orange-900/50">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Used Condition Report
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-6 gap-x-4 text-sm">
                  <div><span className="block text-gray-500">Battery Health</span><span className="font-medium text-gray-700 dark:text-gray-300">{product.usedPhoneDetails.battery_health}%</span></div>
                  <div><span className="block text-gray-500">Screen Condition</span><span className="font-medium text-gray-700 dark:text-gray-300">{product.usedPhoneDetails.screen_condition || '-'}</span></div>
                  <div><span className="block text-gray-500">Frame Condition</span><span className="font-medium text-gray-700 dark:text-gray-300">{product.usedPhoneDetails.frame_condition || '-'}</span></div>
                  <div><span className="block text-gray-500">Back Panel</span><span className="font-medium text-gray-700 dark:text-gray-300">{product.usedPhoneDetails.back_panel_condition || '-'}</span></div>
                  
                  {product.usedPhoneDetails.imei && <div><span className="block text-gray-500">IMEI</span><span className="font-medium text-gray-700 dark:text-gray-300">{product.usedPhoneDetails.imei}</span></div>}
                  <div><span className="block text-gray-500">Face ID</span><span className="font-medium text-gray-700 dark:text-gray-300">{product.usedPhoneDetails.face_id_status ? 'Working' : 'Not Working'}</span></div>
                  <div><span className="block text-gray-500">Fingerprint</span><span className="font-medium text-gray-700 dark:text-gray-300">{product.usedPhoneDetails.fingerprint_status ? 'Working' : 'Not Working'}</span></div>
                  <div><span className="block text-gray-500">Original Box</span><span className="font-medium text-gray-700 dark:text-gray-300">{product.usedPhoneDetails.original_box ? 'Yes' : 'No'}</span></div>
                  <div><span className="block text-gray-500">Original Charger</span><span className="font-medium text-gray-700 dark:text-gray-300">{product.usedPhoneDetails.original_charger ? 'Yes' : 'No'}</span></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct: any) => {
                const thumb = relProduct.images?.find((img: any) => img.is_thumbnail)?.image_path || relProduct.images?.[0]?.image_path;
                const imgUrl = thumb ? `${backendUrl}/storage/${thumb}` : null;
                
                return (
                  <Link to={`/product/${relProduct.slug}`} key={relProduct.id} className="bg-white dark:bg-[#111] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 hover:border-orange-500/50 hover:shadow-md transition-all duration-300 group flex flex-col h-full overflow-hidden">
                    <div className="h-48 bg-gray-100 dark:bg-[#1a1a1a] relative overflow-hidden flex items-center justify-center border-b border-gray-200 dark:border-gray-800 p-4">
                      {imgUrl ? (
                        <img src={imgUrl} alt={relProduct.name} fill unoptimized={true} className="object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="text-gray-500 group-hover:scale-105 transition-transform duration-500">
                          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-orange-500 transition-colors line-clamp-2">{relProduct.name}</h3>
                      </div>
                      <div className="mt-2">
                        {relProduct.discount_price ? (
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-gray-900 dark:text-white">৳{relProduct.discount_price}</span>
                            <span className="text-xs text-gray-500 line-through">৳{relProduct.price}</span>
                          </div>
                        ) : (
                          <span className="text-lg font-bold text-gray-900 dark:text-white">৳{relProduct.price}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}
