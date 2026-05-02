"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function AdminDashboard() {
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState(null);
    const router = useRouter();

    const [chartSeries, setChartSeries] = useState([
        { name: "Payments", data: [1200, 1500, 900, 1400] },
        { name: "Orders", data: [20, 25, 1800, 22] },
    ]);

    const chartOptions = {
        chart: { type: "line", toolbar: { show: false }, zoom: { enabled: false } },
        stroke: { curve: "smooth", width: 3 },
        xaxis: {
            categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
            labels: { style: { colors: "#6B7280", fontSize: "14px" } },
            axisBorder: { show: true, color: "#D1D5DB" },
        },
        yaxis: { labels: { style: { colors: "#6B7280", fontSize: "14px" } } },
        colors: ["#4F46E5", "#29b8ebff"],
        dataLabels: { enabled: false },
        legend: { position: "top", horizontalAlign: "right" },
        grid: { strokeDashArray: 4, borderColor: "#E5E7EB" },
        tooltip: { theme: "light" },
    };

    // Simulate fetching data from server
    useEffect(() => {
        async function fetchData() {
            setLoading(true);

            setTimeout(() => {
                setLoading(false);
            }, 1000);

            try {
                // Replace with your actual API call
                const res = await fetch("/api/admin-dashboard");
                const data = await res.json();

                console.log(data);

                setStats({
                    totalUsers: data.totalUsers,
                    totalOrders: data.totalOrders,
                    totalPayments: data.totalPayments,
                });

                setChartSeries([
                    { name: "Payments", data: data.payments },
                    { name: "Orders", data: data.orders },
                ]);

            } catch (error) {

                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        }

        //fetchData();
    }, []);


    setTimeout(() => {
        router.push("/deshboard/admin/alluser");
    }, 0);



    if (loading) return <DashboardSkeleton />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

            {/* Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
                    <h2 className="text-gray-500 text-sm font-semibold uppercase tracking-wide">
                        Total Users
                    </h2>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{"199k"}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
                    <h2 className="text-gray-500 text-sm font-semibold uppercase tracking-wide">
                        Total Orders
                    </h2>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{"10K"}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
                    <h2 className="text-gray-500 text-sm font-semibold uppercase tracking-wide">
                        Total Payments
                    </h2>
                    <p className="text-3xl font-bold text-gray-800 mt-2">$72,000</p>
                </div>
            </div>

            {/* Chart Section */}
            <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-gray-700 text-lg font-semibold mb-4">
                    Last Month Payments & Orders
                </h2>
                <Chart options={chartOptions} series={chartSeries} type="line" height={350} />
            </div>
        </div>
    );
}






























function DashboardSkeleton() {
    return (
        <div className="p-6 bg-gray-50 min-h-screen animate-pulse">
            {/* Heading */}
            <div className="h-10 w-48 bg-gray-300 rounded mb-8"></div>

            {/* Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {[1, 2, 3].map((_, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-xl shadow"
                    >
                        <div className="h-4 w-32 bg-gray-300 rounded mb-4"></div>
                        <div className="h-8 w-20 bg-gray-300 rounded"></div>
                    </div>
                ))}
            </div>

            {/* Chart Section */}
            <div className="bg-white p-6 rounded-xl shadow">
                <div className="h-5 w-64 bg-gray-300 rounded mb-4"></div>
                <div className="h-80 w-full bg-gray-300 rounded"></div>
            </div>
        </div>
    );
}