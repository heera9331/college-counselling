"use client"
import axios from "axios";
import Link from "next/link";
import React from "react";
import { Chart } from "react-google-charts";

interface student {
    _id: string,
    name: string,
    fatherName: string,
    mobile: string,
    villege: string,
    block: string,
    district: string,
    marks10: string,
    marks12: string,
    caste: string,
    registeredBy: string,
    schoolName: string,
    status: string,
    course: string,
    branch: string,
    category: string,
    chats: string,
    __v: string,
    createdAt: string,
    updatedAt: string,
}

const counselorData = [
    { counselorName: "Heera Singh", count: 6, interested: 4, notInterested: 2, pending: 0, gen: 4, obc: 1, st: 2, sc: 0 },
    { counselorName: "User", count: 6, interested: 4, notInterested: 2, pending: 0, gen: 4, obc: 1, st: 2, sc: 0 },
    { counselorName: "New User", count: 6, interested: 4, notInterested: 2, pending: 0, gen: 4, obc: 1, st: 2, sc: 0 },
]

const cityData = [
    { name: "Sagar", count: 6, interested: 4, notInterested: 2, pending: 0, gen: 4, obc: 1, st: 2, sc: 0 },
    { name: "Damoh", count: 6, interested: 4, notInterested: 2, pending: 0, gen: 4, obc: 1, st: 2, sc: 0 },
    { name: "Chattarpur", count: 6, interested: 4, notInterested: 2, pending: 0, gen: 4, obc: 1, st: 2, sc: 0 },
    { name: "Chattarpur", count: 6, interested: 4, notInterested: 2, pending: 0, gen: 4, obc: 1, st: 2, sc: 0 },
]


const data = [
    ["Districts", "GEN", "OBC", "ST", "SC"],
    ["Sagar", 100, 200, 20, 33],
    ["Damoh", 45, 160, 150, 33],
    ["Chhatarpur", 60, 11, 30, 33],
    ["Raisen", 30, 140, 50, 2],
];

const options = {
    chart: {
        title: "Counselling Performance",
        subtitle: "Category and district wise data: 2023",
    },
};

const Page = (props: any) => {

    return (
        <div className="pb-10">
            {/* page heading */}
            <h1 className="font-semibold text-2xl p-3">Dashboard</h1>
            <div className="py-2 flex gap-4 flex-wrap">
                <div className="border overflow-x-auto p-2 w-fit">
                    <table className="border">
                        <thead className="bg-gray-800 text-gray-100">
                            <tr className="font-semibold">
                                <th className="py-1 px-2">Counselor Name</th>
                                <th className="py-1 px-2">Interested</th>
                                <th className="py-1 px-2">Not Interested</th>
                                <th className="py-1 px-2">Pending</th>
                                <th className="py-1 px-2">GEN</th>
                                <th className="py-1 px-2">OBC</th>
                                <th className="py-1 px-2">ST</th>
                                <th className="py-1 px-2">SC</th>
                                <th className="py-1 px-2">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {counselorData.map((counselor, idx) => {
                                return <tr key={idx} className={`${idx % 2 == 0 ? "" : "bg-gray-200"}`}>
                                    <td className="py-1 px-2">{counselor.counselorName}</td>
                                    <td className="py-1 px-2">{counselor.interested}</td>
                                    <td className="py-1 px-2">{counselor.notInterested}</td>
                                    <td className="py-1 px-2">{counselor.pending}</td>
                                    <td className="py-1 px-2">{counselor.gen}</td>
                                    <td className="py-1 px-2">{counselor.obc}</td>
                                    <td className="py-1 px-2">{counselor.st}</td>
                                    <td className="py-1 px-2">{counselor.sc}</td>
                                    <td className="py-1 px-2">{counselor.count}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="border overflow-x-auto p-2 w-fit">
                    <table className="border">
                        <thead className="bg-gray-800 text-gray-100">
                            <tr className="font-semibold">
                                <th className="py-1 px-2">City Name</th>
                                <th className="py-1 px-2">Interested</th>
                                <th className="py-1 px-2">Not Interested</th>
                                <th className="py-1 px-2">Pending</th>
                                <th className="py-1 px-2">GEN</th>
                                <th className="py-1 px-2">OBC</th>
                                <th className="py-1 px-2">ST</th>
                                <th className="py-1 px-2">SC</th>
                                <th className="py-1 px-2">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cityData.map((city, idx) => {
                                return <tr key={idx} className={`${idx % 2 == 0 ? "" : "bg-gray-200"}`}>
                                    <td className="py-1 px-2">{city.name}</td>
                                    <td className="py-1 px-2">{city.interested}</td>
                                    <td className="py-1 px-2">{city.notInterested}</td>
                                    <td className="py-1 px-2">{city.pending}</td>
                                    <td className="py-1 px-2">{city.gen}</td>
                                    <td className="py-1 px-2">{city.obc}</td>
                                    <td className="py-1 px-2">{city.st}</td>
                                    <td className="py-1 px-2">{city.sc}</td>
                                    <td className="py-1 px-2">{city.count}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="py-2">
                <div className="border overflow-x-auto p-2 w-fit">
                    <Chart
                        chartType="Bar"
                        width="850px"
                        height="600px"
                        data={data}
                        options={options}
                    />
                </div>
            </div>
        </div>
    )
}

export default Page;