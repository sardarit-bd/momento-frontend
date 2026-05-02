"use client";

export default function Alluserskalaton({ rows = 6, cols = 5 }) {
    return (
        <tbody className="text-gray-600 text-sm">
            {Array.from({ length: rows }).map((_, i) => (
                <tr key={i} className="border-b border-gray-200">
                    {Array.from({ length: cols }).map((_, j) => (
                        <td key={j} className="py-4 px-6">
                            <div className="h-4 w-24 bg-gray-200 animate-pulse rounded-md"></div>
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
}
