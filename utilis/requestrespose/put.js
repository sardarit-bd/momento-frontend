import handleUnauthorized from "@/utilis/helper/auth/handleUnauthorized";

const MakePut = async (endpoint, data, token) => {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            },
            body: JSON.stringify(data),
        });

        if (response.status === 401) {
            handleUnauthorized();
            return false;
        }

        const res = await response.json();

        if (!response.ok) {
            console.error(`PUT request failed with status: ${response.status}`);
            return res;
        }

        return res;

    } catch (error) {
        console.error("PUT request error:", error);
        return false;
    }
};

export default MakePut;