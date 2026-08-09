"use client";
import SpinLoader from "@/app/componnent/SpingLoader";
import useLoadingStore from "@/store/useLoadingStore";
import getId from "@/utilis/helper/cookie/getid";
import getCookie from "@/utilis/helper/cookie/gettooken";
import MakeDelete from "@/utilis/requestrespose/delete";
import MakeGet from "@/utilis/requestrespose/get";
import MakePost from "@/utilis/requestrespose/post";
import { useCallback, useEffect, useState } from "react";
import { MdDeleteOutline, MdOutlineCategory } from "react-icons/md";
import { FiPlus, FiTag, FiLayers } from "react-icons/fi";
import { toast } from "react-toastify";

export default function ProfilePage() {

    const id = getId();
    const token = getCookie();
    const { isLoading, setLoading } = useLoadingStore();
    const [fetchloading, setfetchloading] = useState(true);
    const [name, setname] = useState('');
    const [des, setdes] = useState('');
    const [data, setdata] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [focused, setFocused] = useState('');

    const fetching = useCallback(async (id, token) => {
        try {
            const response = await MakeGet(`api/categories`, token);
            setdata(response?.data);
            setfetchloading(false);
        } catch (error) {
            console.error("Error fetching categories:", error);
            setfetchloading(false);
        }
    }, [id, token]);

    useEffect(() => {
        fetching(id, token);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const passdata = { name, description: des };
        const response = await MakePost(`api/categories`, passdata, token);

        if (response?.success) {
            toast.success(response?.message);
            setname('');
            setdes('');
            fetching(id, token);
        } else {
            toast.error('Something went wrong');
        }

        setLoading(false);
    };

    const handleDelect = async (catId) => {
        try {
            setDeletingId(catId);
            const response = await MakeDelete(`api/categories/${catId}`, token);

            if (response?.success) {
                toast.success(response?.message);
                fetching(id, token);
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.error("Error deleting category:", error);
        } finally {
            setDeletingId(null);
        }
    };

    // Subtle color rotation for category icon tiles — keeps things lively without being random per-render
    const palettes = [
        { bg: 'from-sky-50 to-sky-100/50', icon: 'text-sky-500', ring: 'group-hover:ring-sky-200' },
        { bg: 'from-violet-50 to-violet-100/50', icon: 'text-violet-500', ring: 'group-hover:ring-violet-200' },
        { bg: 'from-emerald-50 to-emerald-100/50', icon: 'text-emerald-500', ring: 'group-hover:ring-emerald-200' },
        { bg: 'from-amber-50 to-amber-100/50', icon: 'text-amber-500', ring: 'group-hover:ring-amber-200' },
        { bg: 'from-rose-50 to-rose-100/50', icon: 'text-rose-500', ring: 'group-hover:ring-rose-200' },
        { bg: 'from-cyan-50 to-cyan-100/50', icon: 'text-cyan-500', ring: 'group-hover:ring-cyan-200' },
    ];

    return (
        <div className="w-full">
            {/* Header */}
            <div className="flex items-center gap-4 mb-7">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center shrink-0 shadow-lg shadow-sky-200">
                    <FiLayers className="text-white text-xl" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 leading-tight tracking-tight">Categories</h1>
                    <p className="text-gray-500 text-sm">Create and manage product categories</p>
                </div>
            </div>

            {/* Add Category Form */}
            <div className="relative bg-white rounded-2xl border border-gray-100 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.06)] p-6 mb-7 overflow-hidden">
                {/* Decorative accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 via-sky-500 to-cyan-400"></div>

                <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-100">
                    <FiPlus className="text-sky-500 text-base" />
                    <h2 className="text-base font-semibold text-gray-800">Add New Category</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                Category Title
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                required
                                disabled={isLoading}
                                placeholder="e.g. Simple"
                                onFocus={() => setFocused('name')}
                                onBlur={() => setFocused('')}
                                onChange={(e) => { setname(e.target.value) }}
                                className={`w-full px-4 py-3 bg-gray-50/70 border rounded-xl text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-200 ${
                                    focused === 'name'
                                        ? 'border-sky-400 bg-white ring-4 ring-sky-100'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                Description
                            </label>
                            <input
                                type="text"
                                name="description"
                                value={des}
                                disabled={isLoading}
                                placeholder="Briefly describe this category..."
                                onFocus={() => setFocused('des')}
                                onBlur={() => setFocused('')}
                                onChange={(e) => { setdes(e.target.value) }}
                                className={`w-full px-4 py-3 bg-gray-50/70 border rounded-xl text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-200 ${
                                    focused === 'des'
                                        ? 'border-sky-400 bg-white ring-4 ring-sky-100'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-5 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-sky-500 to-sky-600 text-white text-sm font-semibold rounded-xl hover:from-sky-600 hover:to-sky-700 active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-sky-200 hover:shadow-xl hover:shadow-sky-300"
                        >
                            {isLoading ? <SpinLoader /> : <FiPlus className="text-base" />}
                            Add Category
                        </button>
                    </div>
                </form>
            </div>

            {/* Category List Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                    All Categories
                </h2>
                <span className="text-xs font-semibold text-sky-700 bg-gradient-to-r from-sky-50 to-cyan-50 border border-sky-100 px-3 py-1 rounded-full">
                    {data?.categories?.length || 0} total
                </span>
            </div>

            {fetchloading ? (
                <SkeletonLoader />
            ) : data?.categories?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {data.categories.map((cat, idx) => {
                        const palette = palettes[idx % palettes.length];
                        return (
                            <div
                                key={cat.id}
                                className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/60 hover:-translate-y-1 transition-all duration-300 p-4"
                            >
                                <button
                                    onClick={() => handleDelect(cat?.id)}
                                    disabled={deletingId === cat.id}
                                    className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full text-gray-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all duration-200 disabled:opacity-100"
                                    aria-label="Delete category"
                                >
                                    {deletingId === cat.id ? (
                                        <span className="w-3.5 h-3.5 border-2 border-red-300 border-t-red-500 rounded-full animate-spin" />
                                    ) : (
                                        <MdDeleteOutline className="text-base" />
                                    )}
                                </button>

                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${palette.bg} ring-1 ring-transparent ${palette.ring} flex items-center justify-center mb-3 transition-all duration-300`}>
                                    <FiTag className={`${palette.icon} text-sm`} />
                                </div>

                                <h3 className="text-sm font-semibold text-gray-900 mb-1 pr-6 line-clamp-1 group-hover:text-sky-600 transition-colors duration-200">
                                    {cat?.name}
                                </h3>
                                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                                    {cat?.description || "No description provided"}
                                </p>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-16 bg-gradient-to-b from-white to-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100 flex items-center justify-center mb-4">
                        <MdOutlineCategory className="text-sky-300 text-2xl" />
                    </div>
                    <p className="text-gray-600 text-sm font-semibold">No categories yet</p>
                    <p className="text-gray-400 text-xs mt-1">Add your first category using the form above</p>
                </div>
            )}
        </div>
    );
}

function SkeletonLoader() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-pulse">
            {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100"></div>
                    <div className="h-3.5 bg-gray-100 rounded w-2/3"></div>
                    <div className="space-y-1.5">
                        <div className="h-2.5 bg-gray-100 rounded w-full"></div>
                        <div className="h-2.5 bg-gray-100 rounded w-4/5"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}