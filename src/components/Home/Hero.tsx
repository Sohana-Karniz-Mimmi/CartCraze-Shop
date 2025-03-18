import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";;

export default function Hero() {
  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://media.istockphoto.com/id/1165069915/photo/shopping-bags-in-shopping-cart-and-credit-card-on-laptop-with-paper-boxes-on-table-and-sales.webp?a=1&b=1&s=612x612&w=0&k=20&c=k-5jaSxpiewAqQtsnLjksxg0TD5WtgjXdyXY6_BwPpk="
        alt="Hero background"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
              Quality Products for Every Need
            </h1>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Discover our wide range of products at competitive prices. Shop
              with confidence and enjoy our hassle-free delivery.
            </p>
            <Button asChild size="lg" className="font-medium px-8">
              <Link href="/products">Shop Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}


// const Hero = () => {
//   return (
//     <div>
//       {/* Hero Section */}
//       <section
//         className="py-20 bg-cover bg-center bg-no-repeat"
//         style={{ backgroundImage: "url('/your-image-url.jpg')" }}
//       >
//         <div className="container mx-auto text-center">
//           <h1 className="text-5xl font-bold mb-4 text-white">
//             Welcome to CartCraze
//           </h1>
//           <p className="text-xl mb-8 text-white">
//             Your Ultimate Destination for Trendy Shopping!
//           </p>
//           <Link
//             href="/products"
//             className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100"
//           >
//             Shop Now
//           </Link>
//         </div>
//       </section>

//       {/* Featured Products */}
//       <Products />

//       {/* Categories */}
//       {/* <section className="bg-gray-100 py-12">
//         <div className="container mx-auto">
//           <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <Link href="/category/electronics" className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg">
//               <h3 className="text-xl font-semibold">Electronics</h3>
//             </Link>
//             <Link href="/category/fashion" className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg">
//               <h3 className="text-xl font-semibold">Fashion</h3>
//             </Link>
//             <Link href="/category/accessories" className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg">
//               <h3 className="text-xl font-semibold">Accessories</h3>
//             </Link>
//           </div>
//         </div>
//       </section> */}

//       {/* Special Offers */}
//       <section className="container mx-auto my-12">
//         <h2 className="text-3xl font-bold text-center mb-8">Special Offers</h2>
//         <div className="bg-yellow-200 p-8 rounded-lg text-center">
//           <p className="text-2xl font-semibold">
//             Get 50% Off on Selected Items!
//           </p>
//           <Link
//             href="/offers"
//             className="bg-blue-600 text-white px-6 py-3 rounded-full mt-4 inline-block hover:bg-blue-700"
//           >
//             View Offers
//           </Link>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <Testimonials />

//       {/* Newsletter Subscription */}
//       <section className="bg-blue-600 text-white py-12">
//         <div className="container mx-auto text-center">
//           <h2 className="text-3xl font-bold mb-4">
//             Subscribe to Our Newsletter
//           </h2>
//           <p className="text-xl mb-8">
//             Get the latest updates and exclusive offers.
//           </p>
//           <form className="flex justify-center">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="px-4 py-3 rounded-l-full w-64 focus:outline-none text-black"
//             />
//             <button
//               type="submit"
//               className="bg-white text-blue-600 px-6 py-3 rounded-r-full font-semibold hover:bg-gray-100"
//             >
//               Subscribe
//             </button>
//           </form>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Hero;
