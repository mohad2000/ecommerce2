import React from "react";

const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content border-t border-base-300">
      <aside>
        <h2 className="text-2xl font-bold">Daraz</h2>
        <p>Bringing quality products to your doorstep.<br/>© 2026 Daraz Inc.</p>
      </aside>

     <nav>
        <h6 className="footer-title opacity-70">Shop</h6> 
        <a className="link link-hover">New Arrivals</a>
        <a className="link link-hover">Best Sellers</a>
        <a className="link link-hover">Categories</a>
      </nav> 
      
      <nav>
        <h6 className="footer-title opacity-70">Support</h6> 
        <a className="link link-hover">Help Center</a>
        <a className="link link-hover">Shipping</a>
        <a className="link link-hover">Returns</a>
      </nav>

      {/* Column 3 */}
      <nav>
       {/* فيسبوك */}
<a href="#" className="hover:text-blue-600 transition-colors">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
</a>

{/* إنستغرام */}
<a href="#" className="hover:text-pink-600 transition-colors">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
</a>

{/* تويتر (X) */}
<a href="#" className="hover:text-sky-500 transition-colors">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
</a>
      </nav>

      

      {/* Newsletter */}
<form>
        <h6 className="footer-title opacity-70">Newsletter</h6> 
        <div className="join w-full">
          <input type="email" placeholder="email@address.com" className="input input-bordered join-item w-full" /> 
          <button className="btn btn-primary join-item">Subscribe</button>
        </div>
      </form>


      {/* Bottom */}
      <div className="col-span-1 md:col-span-4 border-t pt-6 mt-6 text-center">
        <p>© 2025 Company, Inc. All rights reserved.</p>
      </div>

    </footer>
  );
};

export default Footer;