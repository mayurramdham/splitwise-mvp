import AddressService from "../services/address.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { SUCCESS_MESSAGES } from "../utils/ApiMessages.js";

class AddressController {
  add = asyncHandler(async (req, res) => {
    const address = await AddressService.createAddress(req.body);
    return ApiResponse.success(res, address, SUCCESS_MESSAGES.ADDRESS_CREATED);
  });
}

export default new AddressController();
