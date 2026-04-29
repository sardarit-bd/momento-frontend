const MakePost = async (endpoint, data, token) => {


    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            },
            body: JSON.stringify(data),
        });

        let payload = null;
        try {
            payload = await response.json();
        } catch (parseError) {
            payload = null;
        }

        if (!response.ok) {
            const errorDetails = {
                success: false,
                status: response.status,
                statusText: response.statusText,
                endpoint,
                error: payload
            };

            return errorDetails;
        }

        return payload; // Actual response data

    } catch (error) {
        return {
            success: false,
            status: 0,
            statusText: "NETWORK_ERROR",
            endpoint,
            error: error?.message || error
        };
    }
};

export default MakePost;

