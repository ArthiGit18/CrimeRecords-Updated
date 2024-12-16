import React from 'react';

const HeaderV1 = ({ title, breadcrumb }) => {
  return (
    <div className="header">
      <div className="container">
        <h2>{title}</h2>
        <div className="header_content">
          {breadcrumb.map((item, index) => (
            <span key={index}>
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.href.startsWith('#')) {
                    document.querySelector(item.href)?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  } else {
                    window.location.href = item.href;
                  }
                }}
              >
                {item.label}
              </a>
              {index < breadcrumb.length - 1 && ' > '}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeaderV1;
