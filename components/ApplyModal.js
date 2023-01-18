import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
const ApplyModal = ({ applyJob }) => {
  return (
    <div>
      <input type="checkbox" id="apply-job" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="bg-white w-[350px] p-5 rounded-lg">
          <h3 className="text-center text-gray-700 text-lg">
            Download the apna app and call HR for{" "}
            <span className="font-semibold">{applyJob?.role}</span>
          </h3>
          <div className="w-36 mx-auto py-6">
            <img
              src="http://api.qrserver.com/v1/create-qr-code/?color=000000&amp;bgcolor=FFFFFF&amp;data=https%3A%2F%2Fbetterjobs.co%2F&amp;qzone=1&amp;margin=0&amp;size=400x400&amp;ecc=L"
              alt="qrcode"
            />
          </div>
          <div className="text-center">
            <label
              htmlFor="apply-job"
              className="btn btn-error mx-2 btn-sm rounded-full px-6"
            >
              Cancel
            </label>
            <Link href="https://betterjobs.co/" target="_blank">
              <button className="btn rounded-full mx-2 px-6 bg-indigo-500 border-none hover:bg-indigo-600 btn-sm">
                Go to playstore
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
