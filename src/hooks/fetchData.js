const getSuspender = (promise) => {
    let status = "pending";
    let response;

    const suspender = promise.then(
        (res) => {
            status = "success";
            response = res;
        },
        (err) => {
            status = "error";
            response = err;
        }
    );

    const read = () => {
        switch (status) {
            case "pending":
                throw suspender;
            case "error":
                console.error("Fetch error:", response);
                return []; // Return empty array on error
            default:
                return response;
        }
    };

    return { read };
};

export function fetchData(url) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    try {
        const promise = fetch(url, {
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                clearTimeout(timeoutId);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .catch((error) => {
                clearTimeout(timeoutId);
                console.error("Fetch error:", error.message);
                return []; // Return empty array on error
            });

        return getSuspender(promise);
    } catch (error) {
        console.error("Error fetching data:", error);
        return getSuspender(Promise.resolve([])); // Return suspender with empty array
    }
}