export const Footer = () => {
  return (
    <footer className="footer footer-center text-white-50 p-10 text-h4-light rounded">
      <div className="lg:grid grid-flow-col gap-4 hidden">
        <a
          className="link link-hover"
          href="https://www.asyncworking.com/"
          target="_blank"
          aria-label="Visit our website"
        >
          About us
        </a>
        <a
          className="link link-hover"
          href="https://www.linkedin.com/in/zhu-derek/"
          target="_blank"
          aria-label="Team members"
        >
          Contact
        </a>
      </div>
      <div>
        <div className="grid grid-flow-col gap-4">
          <a
            className="hover:-translate-y-1"
            href="https://redre4per.github.io/"
            target="_blank"
            aria-label="Visit my personal blog"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="36"
              height="36"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M2 3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V3.993zM6 15v2h12v-2H6zm0-8v6h6V7H6zm8 0v2h4V7h-4zm0 4v2h4v-2h-4zM8 9h2v2H8V9z"
                fill="rgba(255,255,255,1)"
              />
            </svg>
          </a>
          <a
            className="hover:-translate-y-1"
            href="https://www.linkedin.com/in/zhu-derek/"
            target="_blank"
            aria-label="Visit my linkedin"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="36"
              height="36"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 0 1-1.548-1.549 1.548 1.548 0 1 1 1.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z"
                fill="rgba(255,255,255,1)"
              />
            </svg>
          </a>
        </div>
      </div>
      <div className="text-tag-light lg:text-h4-light">
        <p>Copyright © 2023 - All right reserved</p>
        <p>Made by Async Working</p>
      </div>
    </footer>
  );
};
