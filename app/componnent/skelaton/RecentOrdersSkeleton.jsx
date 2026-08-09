
const SkeletonBlock = ({ className = "" }) => (
    <div
        className={`animate-pulse rounded-md bg-slate-200/80 ${className}`}
        aria-hidden="true"
    />
);

const StatusPillSkeleton = () => (
    <div className="inline-flex items-center">
        <SkeletonBlock className="h-6 w-20 rounded-full" />
    </div>
);

const OrderRowSkeleton = () => {
    return (
        <tr className="border-b border-slate-200/80">
            {/* Order ID */}
            <td className="px-6 py-4">
                <SkeletonBlock className="h-4 w-20" />
            </td>

            {/* Customer */}
            <td className="px-6 py-4">
                <div className="space-y-2">
                    <SkeletonBlock className="h-4 w-28" />
                    <SkeletonBlock className="h-3 w-36" />
                </div>
            </td>

            {/* Date */}
            <td className="px-6 py-4">
                <SkeletonBlock className="h-4 w-24" />
            </td>

            {/* Total */}
            <td className="px-6 py-4">
                <SkeletonBlock className="ml-auto h-4 w-16" />
            </td>

            {/* Status */}
            <td className="px-6 py-4">
                <StatusPillSkeleton />
            </td>

            {/* Action */}
            <td className="px-6 py-4 text-right">
                <SkeletonBlock className="ml-auto h-4 w-20" />
            </td>
        </tr>
    );
};

export default function RecentOrdersSkeleton({
    rows = 9,
    title = "Recent Orders",
}) {
    return (
        <div className="w-full rounded-2xl bg-white">
            <div className="p-0 pb-6">
                <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            </div>

            <div className="p-0">
                <div className="overflow-hidden border border-slate-200">
                    <table className="w-full">
                        <thead className="bg-slate-50">
                            <tr className="text-left text-sm font-semibold text-slate-600">
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white">
                            {Array.from({ length: rows }).map((_, i) => (
                                <OrderRowSkeleton key={i} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
