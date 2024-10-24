import React from "react";

function Footer() {
  return (
    <div>
      <hr />
      <footer className="footer footer-center p-10 text-base-content rounded dark:bg-slate-900 dark:text-white">
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover" href="/about">
            About us
          </a>
          <a className="link link-hover" href="/contact">
            Contact
          </a>
        
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a href="https://www.youtube.com/@SIDDHILEARNINGHUB">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
              
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 32 32"
                className="fill-current"
              >
                <path d="M16 .3C7.6.3.7 7.1.7 15.5c0 2.7.7 5.3 2.1 7.6l-1.6 6 6.2-1.6c2.2 1.2 4.7 1.8 7.2 1.8 8.4 0 15.3-6.8 15.3-15.3S24.4.3 16 .3zm8.5 22.5c-.3.8-1.7 1.6-2.3 1.7-.6.1-1.2.2-1.7-.1-.5-.3-2.1-.8-4.1-1.7-3.2-1.4-5.3-4.5-5.4-4.7s-1.3-1.7-1.3-3.2.8-2.2 1.1-2.5c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.4.2.4.8 1.8 1 2 .1.1.1.2 0 .3-.2.2-.5.7-.6.9-.2.2-.5.5-.2 1 .3.5 1.4 2.4 3 3.4 1.7.9 2.4 1 2.9.8.5-.2 1.1-1.2 1.4-1.6.3-.4.6-.3.9-.2.4.2 2.4 1.1 2.8 1.3.4.2.7.2.9.3.2.1.3.7.1 1.4z"></path>
              </svg>
            </a>
          </div>
        </nav>
        <aside>
          <p>Copyright © 2024 - All right reserved by Siddhi Learning Hub</p>
        </aside>
      </footer>
    </div>
  );
}

export default Footer;
