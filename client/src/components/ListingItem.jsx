import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

const ListingItem = ({ listing }) => {
  return (
    <div className="bg-white shadow-md hover:scale-105 transition-scaler duration-500 hover:shadow-lg rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageURLs[0]}
          className="h-[320px] sm:h-[220px] w-full object-cover"
          alt="listing-cover"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="text-lg font-semibold text-slate-700 truncate">
            {listing.name}
          </p>
          <div className="flex items-center gap-2">
            <MdLocationOn className="text-green-700 h-4 w-4" />
            <p className="text-sm text-gray-700 truncate w-full">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-gray-700 line-clamp-2">
            {listing.description}
          </p>
          <p className="text-slate-500 mt-2 font-semibold">
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-us")
              : listing.regularPrice.toLocaleString("en-us")}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="text-slate-700 flex gap-3">
            <div className="font-bold text-xs">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds`
                : `${listing.bedrooms} bed`}
            </div>
            <div className="font-bold text-xs">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths`
                : `${listing.bathrooms} bath`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingItem;
