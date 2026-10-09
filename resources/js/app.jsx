import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './src/components/Navbar';
import Footer from './src/components/Footer';
import { ThemeProvider } from './src/components/ThemeProvider';
import AdminLayout from './src/app/admin/layout';

import Page_about_page_tsx from './src/app/about/page';
import Page_admin_attributes_page_tsx from './src/app/admin/attributes/page';
import Page_admin_brands_page_tsx from './src/app/admin/brands/page';
import Page_admin_categories_page_tsx from './src/app/admin/categories/page';
import Page_admin_coupons_page_tsx from './src/app/admin/coupons/page';
import Page_admin_customers_page_tsx from './src/app/admin/customers/page';
import Page_admin_customer_reviews_page_tsx from './src/app/admin/customer-reviews/page';
import Page_admin_hero_banners_page_tsx from './src/app/admin/hero-banners/page';
import Page_admin_inventory_history_page_tsx from './src/app/admin/inventory/history/page';
import Page_admin_inventory_page_tsx from './src/app/admin/inventory/page';
import Page_admin_orders_page_tsx from './src/app/admin/orders/page';
import Page_admin_orders__id__page_tsx from './src/app/admin/orders/[id]/page';
import Page_admin_page_tsx from './src/app/admin/page';
import Page_admin_products_create_page_tsx from './src/app/admin/products/create/page';
import Page_admin_products_page_tsx from './src/app/admin/products/page';
import Page_admin_products__id__edit_page_tsx from './src/app/admin/products/[id]/edit/page';
import Page_admin_tags_page_tsx from './src/app/admin/tags/page';
import Page_admin_wishlist_page_tsx from './src/app/admin/wishlist/page';
import Page_brands__slug__page_tsx from './src/app/brands/[slug]/page';
import Page_cart_page_tsx from './src/app/cart/page';
import Page_categories_page_tsx from './src/app/categories/page';
import Page_categories__slug__page_tsx from './src/app/categories/[slug]/page';
import Page_checkout_page_tsx from './src/app/checkout/page';
import Page_checkout_success_page_tsx from './src/app/checkout/success/page';
import Page_compare_page_tsx from './src/app/compare/page';
import Page_contact_page_tsx from './src/app/contact/page';
import Page_invoice__order_number__page_tsx from './src/app/invoice/[order_number]/page';
import Page_login_page_tsx from './src/app/login/page';
import Page_offers_page_tsx from './src/app/offers/page';
import Page_page_tsx from './src/app/page';
import Page_privacy_page_tsx from './src/app/privacy/page';
import Page_product__slug__page_tsx from './src/app/product/[slug]/page';
import Page_products_page_tsx from './src/app/products/page';
import Page_products__slug__page_tsx from './src/app/products/[slug]/page';
import Page_profile_addresses_page_tsx from './src/app/profile/addresses/page';
import Page_profile_orders_page_tsx from './src/app/profile/orders/page';
import Page_profile_orders__order_number__page_tsx from './src/app/profile/orders/[order_number]/page';
import Page_profile_page_tsx from './src/app/profile/page';
import Page_profile_wishlist_page_tsx from './src/app/profile/wishlist/page';
import Page_register_page_tsx from './src/app/register/page';
import Page_returns_page_tsx from './src/app/returns/page';
import Page_shipping_page_tsx from './src/app/shipping/page';
import Page_shop_page_tsx from './src/app/shop/page';
import Page_terms_page_tsx from './src/app/terms/page';
import Page_warranty_page_tsx from './src/app/warranty/page';
import Page_wishlist_page_tsx from './src/app/wishlist/page';

export default function App() {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <BrowserRouter>
                <Routes>
                    {/* Admin Routes */}
                    <Route path="/admin/*" element={
                        <AdminLayout>
                            <Routes>
                                <Route path="/" element={<Page_admin_page_tsx />} />
                                <Route path="attributes" element={<Page_admin_attributes_page_tsx />} />
                                <Route path="brands" element={<Page_admin_brands_page_tsx />} />
                                <Route path="categories" element={<Page_admin_categories_page_tsx />} />
                                <Route path="coupons" element={<Page_admin_coupons_page_tsx />} />
                                <Route path="customers" element={<Page_admin_customers_page_tsx />} />
                                <Route path="customer-reviews" element={<Page_admin_customer_reviews_page_tsx />} />
                                <Route path="hero-banners" element={<Page_admin_hero_banners_page_tsx />} />
                                <Route path="inventory/history" element={<Page_admin_inventory_history_page_tsx />} />
                                <Route path="inventory" element={<Page_admin_inventory_page_tsx />} />
                                <Route path="orders" element={<Page_admin_orders_page_tsx />} />
                                <Route path="orders/:id" element={<Page_admin_orders__id__page_tsx />} />
                                <Route path="products/create" element={<Page_admin_products_create_page_tsx />} />
                                <Route path="products" element={<Page_admin_products_page_tsx />} />
                                <Route path="products/:id/edit" element={<Page_admin_products__id__edit_page_tsx />} />
                                <Route path="tags" element={<Page_admin_tags_page_tsx />} />
                                <Route path="wishlist" element={<Page_admin_wishlist_page_tsx />} />
                            </Routes>
                        </AdminLayout>
                    } />

                    {/* Public Routes */}
                    <Route path="/*" element={
                        <div className="min-h-full flex flex-col bg-gray-50 text-gray-900 dark:bg-[#0a0a0a] dark:text-gray-100 transition-colors duration-300">
                            <div className="no-print"><Navbar /></div>
                            <main className="flex-grow">
                                <Routes>
                                    <Route path="/about" element={<Page_about_page_tsx />} />
                                    <Route path="/brands/:slug" element={<Page_brands__slug__page_tsx />} />
                                    <Route path="/cart" element={<Page_cart_page_tsx />} />
                                    <Route path="/categories" element={<Page_categories_page_tsx />} />
                                    <Route path="/categories/:slug" element={<Page_categories__slug__page_tsx />} />
                                    <Route path="/checkout" element={<Page_checkout_page_tsx />} />
                                    <Route path="/checkout/success" element={<Page_checkout_success_page_tsx />} />
                                    <Route path="/compare" element={<Page_compare_page_tsx />} />
                                    <Route path="/contact" element={<Page_contact_page_tsx />} />
                                    <Route path="/invoice/:order_number" element={<Page_invoice__order_number__page_tsx />} />
                                    <Route path="/login" element={<Page_login_page_tsx />} />
                                    <Route path="/offers" element={<Page_offers_page_tsx />} />
                                    <Route path="/" element={<Page_page_tsx />} />
                                    <Route path="/privacy" element={<Page_privacy_page_tsx />} />
                                    <Route path="/product/:slug" element={<Page_product__slug__page_tsx />} />
                                    <Route path="/products" element={<Page_products_page_tsx />} />
                                    <Route path="/products/:slug" element={<Page_products__slug__page_tsx />} />
                                    <Route path="/profile/addresses" element={<Page_profile_addresses_page_tsx />} />
                                    <Route path="/profile/orders" element={<Page_profile_orders_page_tsx />} />
                                    <Route path="/profile/orders/:order_number" element={<Page_profile_orders__order_number__page_tsx />} />
                                    <Route path="/profile" element={<Page_profile_page_tsx />} />
                                    <Route path="/profile/wishlist" element={<Page_profile_wishlist_page_tsx />} />
                                    <Route path="/register" element={<Page_register_page_tsx />} />
                                    <Route path="/returns" element={<Page_returns_page_tsx />} />
                                    <Route path="/shipping" element={<Page_shipping_page_tsx />} />
                                    <Route path="/shop" element={<Page_shop_page_tsx />} />
                                    <Route path="/terms" element={<Page_terms_page_tsx />} />
                                    <Route path="/warranty" element={<Page_warranty_page_tsx />} />
                                    <Route path="/wishlist" element={<Page_wishlist_page_tsx />} />
                                    <Route path="*" element={<div className="flex h-screen items-center justify-center bg-gray-100 text-2xl font-bold text-gray-800">404 - Not Found</div>} />
                                </Routes>
                            </main>
                            <div className="no-print"><Footer /></div>
                        </div>
                    } />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
}
