<?php

namespace App\Services;

use App\Repositories\Contracts\ProductRepositoryInterface;
use Illuminate\Support\Str;

class ProductService
{
    protected $productRepository;

    public function __construct(ProductRepositoryInterface $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function getAllProducts(array $filters = [])
    {
        return $this->productRepository->all($filters);
    }

    public function getPaginatedProducts($perPage = 15, array $filters = [])
    {
        return $this->productRepository->paginate($perPage, $filters);
    }

    public function getTrashedProducts($perPage = 15, array $filters = [])
    {
        return $this->productRepository->getTrashed($perPage, $filters);
    }

    public function getProductById($id)
    {
        return $this->productRepository->find($id);
    }

    public function createProduct(array $data)
    {
        $slugBase = !empty($data['slug']) ? $data['slug'] : $data['name'];
        $data['slug'] = $this->generateUniqueSlug($slugBase);
        
        if (empty($data['sku'])) {
            $data['sku'] = strtoupper(Str::random(8));
        }
        
        return $this->productRepository->create($data);
    }

    public function updateProduct($id, array $data)
    {
        if (isset($data['name']) || isset($data['slug'])) {
            $slugBase = !empty($data['slug']) ? $data['slug'] : $data['name'];
            $data['slug'] = $this->generateUniqueSlug($slugBase, $id);
        }
        
        return $this->productRepository->update($id, $data);
    }

    protected function generateUniqueSlug($name, $ignoreId = null)
    {
        $slug = Str::slug($name);
        $originalSlug = $slug;
        $count = 1;
        
        while ($this->productRepository->slugExists($slug, $ignoreId)) {
            $slug = "{$originalSlug}-{$count}";
            $count++;
        }
        
        return $slug;
    }

    public function deleteProduct($id)
    {
        return $this->productRepository->delete($id);
    }

    public function forceDeleteProduct($id)
    {
        return $this->productRepository->forceDelete($id);
    }

    public function restoreProduct($id)
    {
        return $this->productRepository->restore($id);
    }

    public function duplicateProduct($id)
    {
        $product = $this->productRepository->find($id);
        
        $newData = $product->toArray();
        unset($newData['id'], $newData['created_at'], $newData['updated_at'], $newData['deleted_at']);
        
        $newData['name'] = $newData['name'] . ' (Copy)';
        $newData['slug'] = $newData['slug'] . '-copy-' . time();
        $newData['sku'] = $newData['sku'] . '-COPY-' . strtoupper(Str::random(4));
        $newData['status'] = false; // duplicated products should be inactive by default
        
        return $this->productRepository->create($newData);
    }
}
