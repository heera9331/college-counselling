import React from "react";
import "./globals.css";
import Image from "next/image";

const Page = () => {
  return (
    <div className="p-4 text-2xl">
      <div>
        <h1 className="text-3xl font-bold text-blue-900 inline">
          CounselPro Connect
        </h1>
        <span>{" - "}Now Counselling is Easy</span>
      </div>

      <p className="text-[18px] my-2">A software that help you to handle your counseling in your
        organization, it provide many features of counseling like tracking
        status, interested, courses and enrolled students</p>
      <div className="">
        <Image
          src="/images/homepage.jpg"
          width={512}
          height={512}
          alt="homepage"
          className="sm:w-[350px] md:w-[512px] lg:w-[780px] m-auto"
        />
      </div>

      <div className={""}>
        <h2 className={"text-3xl font-bold py-4 text-center text-gray-600"}>Features</h2>
        {/*  features cards*/}
        <div className="flex flex-col gap-4 m-auto my-4 lg:p-4 md:flex-row">
          <div className="bg-gray-200  rounded-md border-2 flex flex-col items-start gap-2 hover:scale-[1.01]">
            <Image
              src="/images/dashboard.jpg"
              width={1080}
              height={1080}
              alt="homepage"
              className=""
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Interactive Dashboard</h3>
              <p className="text-[18px] text-gray-700 pt-2">
                User experience is paramount in a counseling management system, and an interactive dashboard plays a pivotal role. It provides clients and counselors with real-time insights, fostering a dynamic understanding of progress and key metrics. The intuitive interface enhances engagement, making it easier for users to navigate and access relevant information efficiently.</p>
            </div>
          </div>
          <div className="bg-gray-200  rounded-md border-2 flex flex-col items-start gap-2 hover:scale-[1.01]">
            <Image
              src="/images/reports.jpg"
              width={1080}
              height={1080}
              alt="homepage"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Custom Reports</h3>
              <p className="text-[18px] text-gray-700 pt-2">
                Customized reports further empower users by offering tailored insights. Administrators and counselors can extract specific data for in-depth analysis, enabling personalized decision-making and a more targeted approach to addressing individual needs. This feature enhances the adaptability and effectiveness of the counseling system, catering to diverse requirements and ensuring a user-centric experience.</p>
            </div>
          </div>
          <div className="bg-gray-200  rounded-md border-2 flex flex-col items-start gap-2 hover:scale-[1.01]">
            <Image
              src="/images/reports.jpg"
              width={1080}
              height={1080}
              alt="homepage"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-800">Backup</h3>
              <p className="text-[18px] text-gray-700 pt-2">
                Customized reports further empower users by offering tailored insights. Administrators and counselors can extract specific data for in-depth analysis, enabling personalized decision-making and a more targeted approach to addressing individual needs. This feature enhances the adaptability and effectiveness of the counseling system, catering to diverse requirements and ensuring a user-centric experience.</p>
            </div>
          </div>
        </div>
      </div>

      <div id={"/#contact"} className={"m-auto "}>
        <h2 className={"text-3xl text-gray-600 pl-2 font-semibold my-4"}>Portfolio</h2>
        <embed
          src={"https://heera-singh.netlify.app/"}
          className={"w-[100%] h-[100vh]"}
        />
      </div>


      {/* Contact */}

      <h2 className="text-3xl text-gray-600 font-semibold pl-2 mt-10">Contact</h2>
      <div className="my-4 lg:flex gap-2">
        {/* contact form */}
        <div className="min-w-[50%] border-2 p-4 m-2 rounded-md">
          <div className="flex flex-col py-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              className="bg-gray-100 shadow-sm border-2 border-gray-300 focus:border-blue-800 my-1 py-1 px-2 rounded-md outline-none"
              name="name"
            />
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="mobile">Mobile</label>
            <input
              type="text"
              placeholder="Enter mobile number"
              className="bg-gray-100 shadow-sm border-2 border-gray-300 focus:border-blue-800 my-1 py-1 px-2 rounded-md outline-none"
              name="mobile"
            />
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="msg">Message</label>
            <textarea
              placeholder="Type message or query something"
              className="bg-gray-100 shadow-sm border-2 border-gray-300 focus:border-blue-800 my-1 py-1 px-2 rounded-md outline-none"
              name="msg"
            />
          </div>

          <div className="pt-6">
            <button className="bg-gray-100 shadow-sm border-2 border-gray-300 focus:border-blue-800 hover:bg-white  py-1 px-1 rounded-md outline-none w-full">
              Submit
            </button>
          </div>
        </div>
        <div className="border-2 p-4 m-2 rounded-md">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.0769755691917!2d78.75518557516622!3d23.831355078615204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3978d1574891fdc7%3A0x679f6d33e76242d1!2sGopal%20Ganj%2C%20Sagar%2C%20Madhya%20Pradesh%20470001!5e1!3m2!1sen!2sin!4v1711823717864!5m2!1sen!2sin" width="600" height="450" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
  );
};

export default Page;