class ApiResponse {
    static success(res, data = {}, msgObj) {
        return res.status(msgObj.status).json({
            success: true,
            message: msgObj.message,
            data,
        });
    }
}

export default ApiResponse;