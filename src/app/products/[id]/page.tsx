import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/separator";
import ProductRating from "@/components/ProductDetails/product-rating";
import AddToCartButton from "@/components/ProductDetails/add-to-cart-button";
import RelatedProducts from "@/components/ProductDetails/related-products";
import { IProduct } from "@/types/products";

type TMetaProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: TMetaProps) {
  const id = params.id;
  const product = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await product.json();
  const productDetails = data as IProduct;
  return {
    title: productDetails.title,
    description: productDetails.description,
  };
}

async function getProduct(id: string): Promise<IProduct | undefined> {
  try {
    const response = await fetch(`https://fakestoreapi.com/productsd/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        return undefined;
      }
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }

    // return await response.json();
    const data = await response.json();
    return data as IProduct;
  } catch (error) {
    console.error("Error fetching product:", error);
    return undefined;
  }
}

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const product = await getProduct(id);
  // const product = {
  //   id: 1,
  //   title: "Premium Wireless Headphones",
  //   price: 129.99,
  //   description:
  //     "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  //   image:
  //     "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D",
  //   rating: {
  //     rate: 3.9,
  //     count: 120,
  //   },
  //   category: "Electronics",
  // };

  if (!product) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="flex justify-center">
          <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-lg border bg-white">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title || "No title available"}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {product.title || "No title available"}
            </h1>
            <div className="mt-2 flex items-center gap-4">
              <ProductRating rating={product.rating?.rate || 0} />
              <span className="text-sm text-muted-foreground">
                ({product.rating?.count || 0} reviews)
              </span>
            </div>
            <p className="text-2xl font-semibold mt-4 text-primary">
              ${Number(product.price || 0).toFixed(2)}
            </p>
          </div>

          <div className="prose prose-sm">
            <p>{product.description || "No description available"}</p>
          </div>

          <div className="flex items-center">
            <span className="text-sm font-medium">Category: </span>
            <span className="text-sm text-muted-foreground ml-2 capitalize">
              {product.category || "No category"}
            </span>
          </div>

          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-3">
              <AddToCartButton product={product} />
              <Button variant="outline">Add to Wishlist</Button>
            </div>
          </div>

          <Separator />

          <div className="prose prose-sm">
            <h3 className="text-lg font-semibold">Product Details</h3>
            <p>{product.description || "No description available"}</p>
            <p>
              This {product.category || "No category"} item has received{" "}
              {product.rating.rate || 0} stars from {product.rating.count}{" "}
              customers.
            </p>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      <section>
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <RelatedProducts
          currentProductId={product.id}
          category={product.category}
        />
      </section>
    </div>
  );
};

export default page;
