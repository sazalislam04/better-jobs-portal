import Image from "next/image";
import Link from "next/link";

const ApplyModal = ({ applyJob, setApplyJob }) => {
  return (
    <div>
      <input type="checkbox" id="apply-job" className="modal-toggle" />
      <div className="modal modal-middle">
        <div className="bg-white w-[350px] p-5 rounded-lg">
          <h3 className="text-center text-gray-700 text-lg">
            Download the BetterJobs app and Chat with HR for{" "}
            <span className="font-semibold">{applyJob?.role}</span>
          </h3>
          <div className="w-36 mx-auto py-6">
            <Image
              src="http://api.qrserver.com/v1/create-qr-code/?color=000000&amp;bgcolor=FFFFFF&amp;data=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps&amp;qzone=1&amp;margin=0&amp;size=400x400&amp;ecc=L"
              alt="qrcode"
              width={130}
              height={130}
            />
          </div>
          <div className="text-center">
            <label
              htmlFor="apply-job"
              className="btn btn-error mx-2 btn-sm rounded-lg px-4"
            >
              Cancel
            </label>
            <Link
              href="https://play.google.com/store/apps/details?id=com.betterjobs.app"
              target="_blank"
            >
              <button
                onClick={() => setApplyJob()}
                className="btn rounded-lg mx-2 px-4 bg-[#037b8e] border-none hover:bg-[#016777] btn-sm"
              >
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
