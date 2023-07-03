import axios from "axios";

export const truncStr = (string, limit) => {
    return string.length > limit
        ? string
            .trim()
            .substring(0, limit - 3)
            .trim() + "..."
        : string;
};

const resources = {};

const makeRequestCreator = () => {
    let cancel;

    return async phoneNumber => {
        if (cancel) {
            // Cancel the previous request before making a new request
            cancel.cancel();
        }
        // Create a new CancelToken
        cancel = axios.CancelToken.source();
        try {
            if (resources[phoneNumber]) {
                // Return result if it exists
                return resources[phoneNumber];
            }
            const res = await axios(phoneNumber);

            const result = res.data.results;
            // Store response
            resources[phoneNumber] = result;

            return result;
        } catch (error) {
            if (axios.isCancel(error)) {
                // Handle if request was cancelled
                console.log("Request canceled", error.message);
            } else {
                // Handle usual errors
                console.log("Something went wrong: ", error.message);
            }
        }
    };
};

export const search = makeRequestCreator();
