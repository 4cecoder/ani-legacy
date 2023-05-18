import React from "react";

const PrivacyNotice: React.FC = () => {
  return (
    <div className="mt-40 mb-20 flex h-screen items-center justify-center p-2">
      <div className="w-2/3 rounded-lg bg-gray-700 p-4 text-white shadow-md">
        <h1 className="mb-2 text-lg font-medium">Privacy Notice for Ani-J</h1>
        <div className="mb-4 text-sm">
          <p>1. Introduction</p>
          <p className="mb-2">
            Welcome to Ani-J, an anime social network. We take the privacy of
            our users very seriously and have implemented the following policies
            to protect your personal information.
          </p>
          <hr className="my-2" />
          <p>2. Collection of Personal Information</p>
          <p className="mb-2">
            Ani-J may collect personal information such as your name, email
            address, and location when you create an account or use certain
            features of the platform. This information is used to provide you
            with a personalized experience and improve the services we offer.
          </p>
          <hr className="my-2" />
          <p>3. Use of Personal Information</p>
          <p className="mb-2">
            Ani-J may use your personal information to communicate with you,
            provide you with updates or offers, and improve the services we
            offer. We will not sell or share your personal information with
            third parties without your consent, unless required by law.
          </p>
          <hr className="my-2" />
          <p>4. Data Security</p>
          <p className="mb-2">
            Ani-J takes measures to protect your personal information from
            unauthorized access, use, or disclosure. However, no internet
            transmission is completely secure and we cannot guarantee the
            security of your information.
          </p>
          <hr className="my-2" />
          <p>5. Changes to the Privacy Notice</p>
          <p className="mb-2">
            Ani-J reserves the right to make changes to this privacy notice at
            any time. Your continued use of our services indicates your
            acceptance of any changes to this notice.
          </p>
          <hr className="my-2" />
          <p>
            By using Ani-J, you acknowledge and agree to our privacy notice. If
            you have any questions or concerns, please contact us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyNotice;
