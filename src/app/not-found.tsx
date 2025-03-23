import { Button } from "@/components/ui/Button";
import { Home } from "lucide-react";
import Link from "next/link";

const notfound = () => {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center max-w-md mx-auto mb-6">
        <h4 className="font-bold text-[38px]">Sorry !</h4>
        <p className="text-[20px] mb-6">
          We could&apos;t find the page you are looking for.
        </p>
        <Button asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default notfound;
