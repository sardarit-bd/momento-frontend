const MakeDelete = async (endpoint, token) => {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",

            }
        });

        if (!response.ok) {
            console.error(`Delete request failed with status: ${response.status}`);
            return false;
        }

        const res = await response.json();
        return res;

    } catch (error) {
        console.error("Delete request error:", error);
        return false;
    }
};

export default MakeDelete;
