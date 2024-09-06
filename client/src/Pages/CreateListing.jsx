import React from "react";

const CreateListing = () => {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="description"
            className="border p-3 rounded-lg"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="address"
            className="border p-3 rounded-lg"
            id="address"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                defaultValue="1"
                required
                className="text-center p-3 border-gray-300 rounded-lg h-9 w-13"
              />
              <span>Bedrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                defaultValue="1"
                required
                className="text-center p-3 border-gray-300 rounded-lg h-9 w-13"
              />
              <span>Bathrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max="10"
                defaultValue="1"
                required
                className="text-center p-3 border-gray-300 rounded-lg h-9 w-13"
              />
              <div className="flex flex-col">
                <span>Regular Price</span>
                <span className="text-slate-600 text-xs">($ / month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountedPrice"
                min="1"
                max="10"
                defaultValue="1"
                required
                className="text-center p-3 border-gray-300 rounded-lg h-9 w-13"
              />
              <div className="flex flex-col">
                <span>Discounted Price</span>
                <span className="text-slate-600 text-xs">($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be cover(max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              type="file"
              id="images"
              className="p-3 border border-gray-300 rounded w-full hover:shadow-sm"
              accept="image/*"
              multiple
            />
            <button className="px-2 rounded uppercase hover:shadow-lg disabled:opacity-80 text-green-700 border border-green-700">
              Upload
            </button>
          </div>
          <button className="p-3 uppercase text-white rounded-lg bg-slate-700 hover:opacity-95 disabled:opacity-80">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
