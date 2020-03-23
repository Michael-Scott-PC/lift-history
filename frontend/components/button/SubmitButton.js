import React from 'react';

const SubmitButton = () => {
  return (
    <div className="btn-container text-center">
      <button className="btn btn-submit btn-primary center" type="submit">
        Submit
      </button>

      <style jsx>
        {`
          .btn-submit {
            width: 45%;
            background-color: #599ac7;
          }
        `}
      </style>
    </div>
  );
};

export default SubmitButton;
