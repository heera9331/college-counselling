import React from "react";
import "./globals.css";
import Image from "next/image";

const Page = () => {
  return (
    <div className="max-w-[1440px] border-2 p-2 m-2 mt-[70px] shadow-sm min-h-[100vh]">
      <div className={"scroll-smooth"}>
        <div className="md:grid md:grid-cols-2 items-center justify-center gap-4 h-[80vh] px-4 sm:grid-cols">
          <div className="px-10">
            <div className="w-[290px] py-4">
              <h1 className="text-3xl font-bold text-blue-900">
                CounselPro Connect
              </h1>
              <p className="text-right text-italic">Now counseling is easy</p>
            </div>
            <p>
              A software that help you to handle your counseling in your
              organization, it provide many features of counseling like tracking
              status, interested, courses and enrolled students
            </p>
          </div>
          <div className="">
            <Image
              src="/images/homepage.jpg"
              width={512}
              height={512}
              alt="homepage"
            />
          </div>
        </div>

        <div className={""}>
          <h2 className={"text-3xl font-bold py-2 text-left"}>Features</h2>
          {/*  features*/}
          <h2 className={"text-2xl font-semibold py-2 text-left"}>
            Interactive Dashboard
          </h2>
          <div className={"flex flex-cols-2 items-center"}>
            <p className="px-6">
              User experience is paramount in a counseling management system,
              and an interactive dashboard plays a pivotal role. It provides
              clients and counselors with real-time insights, fostering a
              dynamic understanding of progress and key metrics. The intuitive
              interface enhances engagement, making it easier for users to
              navigate and access relevant information efficiently.
            </p>
            <Image
              src="/images/dashboard.jpg"
              width={512}
              height={512}
              alt="homepage"
            />
          </div>
          <h2 className={"text-2xl font-semibold py-2 text-left"}>
            Custom Reports
          </h2>
          <div className={"flex flex-cols-2 items-center"}>
            <Image
              src="/images/reports.jpg"
              width={512}
              height={512}
              alt="homepage"
            />
            <p className="px-6">
              Customized reports further empower users by offering tailored
              insights. Administrators and counselors can extract specific data
              for in-depth analysis, enabling personalized decision-making and a
              more targeted approach to addressing individual needs. This
              feature enhances the adaptability and effectiveness of the
              counseling system, catering to diverse requirements and ensuring a
              user-centric experience.
            </p>
          </div>
        </div>
        {/* Contact */}

        <div id={"/#contact"} className={"m-auto"}>
          <h2 className={"text-3xl font-bold py-2"}>Contact</h2>
          <embed
            src={"https://heera-singh.netlify.app/"}
            className={"w-[100%] h-[100vh]"}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;