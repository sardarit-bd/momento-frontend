const logingandsignupmakepost = async (endpoint, data) => {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(data),
        });


        console.log("API Response Status:", response);

        if (!response.ok) {
            console.error(`Request failed with status: ${response.status}`);
            return false;
        }

        const res = await response.json();
        return res; // Actual response data

    } catch (error) {
        return false;
    }
};

export default logingandsignupmakepost;

