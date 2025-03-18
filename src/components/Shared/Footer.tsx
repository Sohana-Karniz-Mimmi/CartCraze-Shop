const Footer = () => {
    return (
      <footer className="border-t border-gray-200  py-6 mt-auto">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} CartCraze. All rights reserved.
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;