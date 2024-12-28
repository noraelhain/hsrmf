// eslint-disable-next-line react/prop-types
const SubmitButton = ({ loading, children, ...rest }) => {
  return (
    <button
      disabled={loading}
      className="mt-4 flex justify-center disabled:cursor-not-allowed outline-none py-1 rounded-md items-center  text-[#696cff] border w-48 px-12 border-1 border-[#5265FF] "
      {...rest}
    >
      {loading ? (
        <svg
          className="animate-spin -ml-1  mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : null}
      {children}
    </button>
  );
};

export default SubmitButton;
